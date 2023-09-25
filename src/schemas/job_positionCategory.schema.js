import Joi from 'joi';

const job_positionCategorySchema = {
	job_positionCategory: Joi.object({
		name: Joi.string().required()
	})
};

export default job_positionCategorySchema;
