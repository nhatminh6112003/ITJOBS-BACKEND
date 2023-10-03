const Joi = require('joi').extend(require('@joi/date'));

const ResumeSchema = {
	resume_title: Joi.object({
		title: Joi.string().required().max(400)
	}),
	resume_profile: Joi.object({
		gender: Joi.string().valid('Male', 'Female', 'Other').required(),
		phone_number: Joi.string()
			.pattern(/^(?:\+84|0)(?:\d{9}|\d{10})$/)
			.required(),
		marial_status: Joi.string().valid('0', '1').required(),
		provinces: Joi.string().required(),
		districts: Joi.string().required(),
		address: Joi.string().required(),
		birthday: Joi.date().format('YYYY-MM-DD').utc()
	}),
	resume_language: Joi.object({
		resume_id: Joi.string().required(),
		rs_language: Joi.string().valid('vn', 'en', 'fr', 'de', 'ru', 'cn', 'kr', 'jp', 'other').required(),
		rs_language_level: Joi.string().valid('1', '2', '3', '4', '5').required(),
		rs_language_certify: Joi.string()
	}),
	resume_objective: Joi.object({
		resume_id: Joi.string().required(),
		objective_job: Joi.string().required()
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
	}),
	resume_certificate: Joi.object({
		resume_id: Joi.string().required(),
		cer_title: Joi.string().required(),
		cer_by: Joi.string().required(),
		cer_limit: Joi.boolean(),
		cer_form: Joi.date().required(),
		cer_to: Joi.date()
	}),
	resume_refer: Joi.object({
		resume_id: Joi.string().required(),
		ref_name: Joi.string().required(),
		ref_title: Joi.string().required(),
		ref_company: Joi.string().required(),
		ref_phone: Joi.string()
			.pattern(/^(?:\+84|0)(?:\d{9}|\d{10})$/)
			.required(),
		ref_email: Joi.string().email({ minDomainSegments: 2 }).required()
	}),
	resume_template: {
		updateTemplate: Joi.object({
			cv_template_id: Joi.number().required()
		}),
		updateUi: Joi.object({
			cv_color: Joi.string().required(),
			cv_font: Joi.string().required(),
			cv_language: Joi.string().required(),
			cv_size: Joi.string().required()
		})
	},
	resume_work_type: Joi.object(
		{
			resume_id: Joi.string().required(),
			work_type_id: Joi.number().required(),
		}
	),
	resume_addioninfo: Joi.object(
		{
			resume_id: Joi.string().required(),
			addioninfo: Joi.string().required(),
		}
	)
	,
	resume_desired_job: Joi.object({
		position_id: Joi.number().required(),
		resume_id: Joi.string().required(),
		profession_id: Joi.array().items(Joi.number()).required(),
		salary_from: Joi.string().required(),
		salary_to: Joi.string().required(),
		work_type_id: Joi.array().items(Joi.number()).required(),
		work_home: Joi.boolean().required(),
		provinces: Joi.number().required(),
		districts: Joi.number().required(),
		welfare_id: Joi.array().items(Joi.number()).required()
	}),
	resume_activity: Joi.object({
		resume_id: Joi.string().required(),
		organization: Joi.string().required(),
		role: Joi.string().required(),
		start_date: Joi.date().required(),
		end_date: Joi.date(),
		activity_des: Joi.string(),
		activity_current: Joi.boolean(),
		status: Joi.boolean()
	}),
	resume_experience: Joi.object({
		resume_id: Joi.string().required(),
		rexp_worktype_id: Joi.number(),
		rexp_title: Joi.string().required(),
		rexp_company: Joi.string().required(),
		rexp_workdesc: Joi.string().required(),
		rexp_form: Joi.date().required(),
		rexp_to: Joi.date(),
		experCurrent: Joi.boolean()
	})
};
export default ResumeSchema;
