const User = require('./../models/User');

exports.getUserById = async (id) => {
	const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
	if (!user) throw { status: 404, message: 'User not found' };
	return user;
};

exports.updateUser = async (id, data) => {
	if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
		throw { status: 400, message: 'No data provided for update' };
	}

	const user = await User.findByPk(id);
	if (!user) throw { status: 404, message: 'User not found' };

	await user.update(data);
	return { message: 'Profile updated' };
};

exports.getAllUsers = async () => {
	return await User.findAll({ attributes: { exclude: ['password'] } });
};