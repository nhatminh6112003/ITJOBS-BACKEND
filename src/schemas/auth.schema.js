import Joi from 'joi';

const AuthSchema = {
	register: Joi.object({
		firstname: Joi.string().pattern(/^\D+$/).required().messages({
			'string.pattern.base': 'Tên không được nhập số và ký tự đặc biệt',
			'any.required': 'Firstname is required'
		}),
		lastname: Joi.string().pattern(/^\D+$/).required().messages({
			'string.pattern.base': 'Tên không được nhập số và ký tự đặc biệt',
			'any.required': 'Lastname is required'
		}),
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
