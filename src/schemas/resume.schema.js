const Joi = require('joi').extend(require('@joi/date'));

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
		birthday: Joi.date().format('YYYY-MM-DD').utc()
	}),
	resume_language: Joi.object({
		resume_id: Joi.string().required(),
		rs_language: Joi.string().valid('vn', 'en', 'fr', 'de', 'ru', 'cn', 'kr', 'jp', 'other').required(),
		rs_language_level: Joi.string().valid('1', '2', '3', '4', '5').required(),
		rs_language_certify: Joi.string()
	}),
	resume_skill: Joi.object({
		resume_id: Joi.string().required(),
		skill_name: Joi.string().required(),
		skill_content: Joi.string(),
		skill_level: Joi.string().valid('0', '1', '2', '3', '4', '5').required()
	}),
	resume_education: Joi.object({
		resume_id: Joi.string().required(),
		redu_name: Joi.string().required(),
		redu_degree: Joi.string().valid('0', '1', '2', '3', '4', '5', '6').required(),
		redu_date: Joi.date(),
		redu_desc: Joi.string()
	})
};
export default ResumeSchema;
