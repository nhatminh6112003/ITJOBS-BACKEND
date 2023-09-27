import Joi from 'joi';

const ProfessionSchema = {
	profession: Joi.object({
		name: Joi.string().required(),
		jobPositionCategoryId: Joi.string()
	})
};

export default ProfessionSchema;
