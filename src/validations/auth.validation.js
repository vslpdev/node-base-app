const Joi = require('joi');

exports.validateSignup = (req, res, next) => {
	const schema = Joi.object({
		username: Joi.string().min(3).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });
	next();
};

exports.validateLogin = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });
	next();
};

// Additional validators for tokens or passwords
exports.validateEmailToken = (req, res, next) => {
	const schema = Joi.object({ token: Joi.string().required() });
	const { error } = schema.validate(req.query);
	if (error) return res.status(400).json({ error: 'Invalid email token' });
	next();
};

exports.validatePasswordReset = (req, res, next) => {
	const schema = Joi.object({
		token: Joi.string().required(),
		newPassword: Joi.string().min(8).required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });
	next();
};