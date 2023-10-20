import Joi from 'joi';

const jobPostSchema = {
	jobPost: Joi.object({
		posted_by_id: Joi.string().required(),
		company_id: Joi.string().required(),
		job_degree_value: Joi.number().required(),
		job_position_value: Joi.number().required(),
		job_experience_value: Joi.number().required().valid(0, 1, 2),
		address: Joi.string(),
		form_age: Joi.string(),
		to_age: Joi.string(),
		job_title: Joi.string(),
		gender: Joi.string().valid('0', '1', '2'),
		is_address_work_hidden: Joi.boolean(),
		min_salary: Joi.number().required(),
		max_salary: Joi.number().required(),
		posted_date: Joi.date(),
		job_desc: Joi.string(),
		job_request: Joi.string().required(),
		status: Joi.string().valid('0', '1', '2'),
		work_home: Joi.boolean(),
		isDeleted: Joi.boolean(),
		job_formExperience: Joi.number(),
		job_ToExperience: Joi.number()
	})
};

export default jobPostSchema;
