const { DataTypes } = require('sequelize');
const sequelize = require('./../config/db');

const User = sequelize.define('user', {
	id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
	username: { type: DataTypes.STRING, allowNull: false, unique: true },
	email: { type: DataTypes.STRING, allowNull: false, unique: true },
	password: { type: DataTypes.STRING, allowNull: false },
	role: { type: DataTypes.STRING, defaultValue: 'user' },
	isVerified: { type: DataTypes.BOOLEAN, defaultValue: true },
	createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = User;
