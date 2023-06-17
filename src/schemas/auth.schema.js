import Joi from 'joi';

const AuthSchema = {
	register: Joi.object({
		email: Joi.string().email({ minDomainSegments: 2 }).required(),
		password: Joi.string().min(8).required(),
		user_type_id: Joi.number().required()
	}),
	login: Joi.object({
		email: Joi.string().required(),
		password: Joi.string().min(8).required(),
		user_type_id: Joi.number().required()
	})
};

export default AuthSchema;
