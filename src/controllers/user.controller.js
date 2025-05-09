const userService = require('./../services/user.service');

exports.getProfile = async (req, res, next) => {
	try {
		const user = await userService.getUserById(req.user.id);
		res.json(user);
	} catch (err) {
		next(err);
	}
};

exports.updateProfile = async (req, res, next) => {
	try {
		const updated = await userService.updateUser(req.user.id, req.body);
		res.json(updated);
	} catch (err) {
		next(err);
	}
};

// Admin-only: get any user or list users
exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await userService.getAllUsers();
		res.json(users);
	} catch (err) {
		next(err);
	}
};
