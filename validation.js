// VALIDATION
const Joi = require("joi");

// Register validation
const registerValidation = (data) => {
	const validationSchema = Joi.object({
		name: Joi.string().min(6).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});

	// LET's VALIDATE THE DATA BEFORE MAKING A USER
	return validationSchema.validate(data);
};

const loginValidation = (data) => {
	const validationSchema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});

	// LET's VALIDATE THE DATA BEFORE LOGGIN HIM IN
	return validationSchema.validate(data);
};

module.exports = {
	registerValidation,
	loginValidation,
};
