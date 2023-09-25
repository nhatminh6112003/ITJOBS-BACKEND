import Joi from 'joi';

const ProfessionSchema = {
	profession: Joi.object({
		name: Joi.string().required()
	})
};

export default ProfessionSchema;
