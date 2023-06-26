import Joi from 'joi';
const ResumeSchema = {
	resume_title: Joi.object({
		title: Joi.string().required().max(400)
	}),
	resume_profile: Joi.object({
		firstname: Joi.string().required().max(30),
		lastname: Joi.string().required().max(30),
		gender: Joi.string().valid('Male', 'Female', 'Other').required(),
		phone_number: Joi.string()
			.pattern(/^(?:\+84|0)(?:\d{9}|\d{10})$/)
			.required(),
		marial_status: Joi.string().valid('0', '1').required(),
		birthday: Joi.date().required()
	})
};
export default ResumeSchema;
