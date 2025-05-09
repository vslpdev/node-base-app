// src/validations/user.validation.js
const Joi = require('joi');

exports.validateUpdateProfile = (req, res, next) => {
	const schema = Joi.object({
		username: Joi.string().min(3),
		email: Joi.string().email(),
		// other fields (e.g., role) if admins can change them
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });
	next();
};