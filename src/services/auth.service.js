const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const Token = require('./../models/Token');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('./../config/env');

// ========= REGISTER =========
exports.registerUser = async ({ username, email, password }) => {
	// Hash password
	const hashed = await bcrypt.hash(password, 10);  // bcryptjs: saltRounds=10:contentReference[oaicite:11]{index=11}
	// Create user (with default role)
	const user = await User.create({ username, email, password: hashed, role: 'user' });
	return user;
};

// ========= LOGIN =========
exports.authenticateUser = async (email, password) => {
	const user = await User.findOne({ where: { email } });
	if (!user) throw { status: 401, message: 'Invalid credentials' };

	const match = await bcrypt.compare(password, user.password);
	if (!match) throw { status: 401, message: 'Invalid credentials' };

	// remove password key from user object
	await delete user.password;

	// Generate JWT access token (short-lived) and refresh token (long-lived)
	const userId = user.id;
	const accessToken = jwt.sign({ id: userId, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
	const refreshToken = jwt.sign({ id: userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

	// Save refreshToken in DB for later revocation
	await Token.create({ token: refreshToken, type: 'refresh', expires: Date.now() + 7 * 24 * 60 * 60 * 1000, userId });

	return { accessToken, refreshToken, user };
};

// ========= RESET PASSWORD =========
exports.resetPassword = async (token, newPassword) => {
	// Verify the token (find it in DB, check expiry), then update user's password
	const record = await Token.findOne({ where: { token, type: 'reset' }, include: User });

	if (!record || record.expires < Date.now()) throw { status: 400, message: 'Invalid or expired reset token' };

	const user = record.User;
	const hashed = await bcrypt.hash(newPassword, 10);
	await user.update({ password: hashed });
	// Optionally delete used reset token
};

// ========= REFRESH TOKEN =========
exports.refreshTokens = async (oldRefreshToken) => {
	// Verify old refresh token and that it exists in DB
	const payload = jwt.verify(oldRefreshToken, JWT_REFRESH_SECRET);

	const record = await Token.findOne({ where: { token: oldRefreshToken, type: 'refresh', userId: payload.id } });
	if (!record) throw { status: 401, message: 'Invalid refresh token' };

	// Issue new tokens
	const user = await User.findByPk(payload.id);

	const newAccess = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
	const newRefresh = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

	// Update DB: delete old refresh and store new
	await record.destroy();
	await Token.create({ token: newRefresh, type: 'refresh', expires: Date.now() + 7 * 24 * 60 * 60 * 1000, UserId: user.id });

	return { accessToken: newAccess, refreshToken: newRefresh };
};
