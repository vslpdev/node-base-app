const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./../config/env');

// Verify JWT and attach user info to `req.user`
exports.verifyToken = (req, res, next) => {
	const authHeader = req.header('Authorization') || '';
	const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
	if (!token) return res.status(401).json({ message: 'Access token required' });
	try {
		const payload = jwt.verify(token, JWT_SECRET);
		req.user = { id: payload.id, role: payload.role };
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
};

// Role-based access control
exports.authorizeRoles = (...allowedRoles) => (req, res, next) => {
	if (!req.user || !allowedRoles.includes(req.user.role)) {
		return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
	}
	next();
};