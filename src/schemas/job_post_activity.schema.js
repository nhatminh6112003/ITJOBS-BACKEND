import Joi from 'joi';

const jobPostActivitySchema = {
	jobPostActivity: Joi.object({
		user_account_id: Joi.string().required(),
		resume_id: Joi.string().required(),
		job_id: Joi.string().required(),
		apply_date: Joi.date(),
		resume_type: Joi.number().required(),
		status: Joi.number()
	})
};

export default jobPostActivitySchema;
