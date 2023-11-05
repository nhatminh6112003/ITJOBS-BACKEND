import Joi from 'joi';

const userServiceSchema = {
	userService: Joi.object({
		user_account_id: Joi.string().required(),
		service_id: Joi.string().required(),
		expiration_date: Joi.date(),
		register_date: Joi.date()
	})
};

export default userServiceSchema;
