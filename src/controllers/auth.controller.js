const authService = require('./../services/auth.service');

exports.register = async (req, res, next) => {
	try {
		const user = await authService.registerUser(req.body);
		res.status(201).json({ message: 'Registration successful', success: true, data: { userId: user.id } });
	} catch (err) {
		next(err);
	}
};

exports.login = async (req, res, next) => {
	try {
		const user = await authService.authenticateUser(req.body.email, req.body.password);
		res.status(200).json({ message: 'Login successful', success: true, data: user });
	} catch (err) {
		next(err);
	}
};

// Reset password endpoint
exports.resetPassword = async (req, res, next) => {
	try {
		const { token, newPassword } = req.body;
		await authService.resetPassword(token, newPassword);
		res.status(200).json({ message: 'Password has been reset', success: true, data: null });
	} catch (err) {
		next(err);
	}
};

// Token refresh endpoint
exports.refreshToken = async (req, res, next) => {
	try {
		const newTokens = await authService.refreshTokens(req.body.refreshToken);
		res.json(newTokens);
	} catch (err) {
		next(err);
	}
};