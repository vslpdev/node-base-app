// src/models/Token.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Token = sequelize.define('token', {
	token: { type: DataTypes.STRING, allowNull: false },
	type: { type: DataTypes.STRING, allowNull: false }, // e.g. 'refresh', 'verify-email', 'reset-password'
	expires: { type: DataTypes.DATE, allowNull: false },
});

Token.belongsTo(User);

module.exports = Token;