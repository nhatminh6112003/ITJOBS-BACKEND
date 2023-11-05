import Joi from 'joi';

const serviceSchema = {
	service: Joi.object({
		service_type_id: Joi.string().required(),
		price_list: Joi.string().required(),
		description: Joi.string(),
		name: Joi.string().required(),
		benefits_id: Joi.string().required()
	})
};

export default serviceSchema;
