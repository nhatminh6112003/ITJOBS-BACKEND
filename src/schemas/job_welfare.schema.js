import Joi from 'joi';

const jobWelfareSchema = {
	jobWelfare: Joi.object({
		welfare_type: Joi.string().required()
	})
};

export default jobWelfareSchema;
