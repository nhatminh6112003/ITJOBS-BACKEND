import ResumeSchema from '@src/schemas/resume.schema';
import validateRequest from '@src/middleware/validateRequest';

const {
	resume_title,
	resume_profile,
	resume_language,
	resume_objective,
	resume_skill,
	resume_education,
	resume_certificate,
	resume_refer,
	resume_template,
	resume_desired_job,
	resume_work_type,
	resume_addioninfo,
	resume_activity,
	resume_experience
} = ResumeSchema;

const ResumeValidation = {
	resume_title: validateRequest(resume_title),
	resume_profile: validateRequest(resume_profile),
	resume_language: validateRequest(resume_language),
	resume_objective: validateRequest(resume_objective),
	resume_skill: validateRequest(resume_skill),
	resume_education: validateRequest(resume_education),
	resume_certificate: validateRequest(resume_certificate),
	resume_refer: validateRequest(resume_refer),
	resume_work_type: validateRequest(resume_work_type),
	resume_template: {
		updateTemplate: validateRequest(resume_template.updateTemplate),
		updateUi: validateRequest(resume_template.updateUi)
	},
	resume_desired_job: validateRequest(resume_desired_job),
	resume_activity: validateRequest(resume_activity),
	resume_addioninfo: validateRequest(resume_addioninfo),
	resume_experience: validateRequest(resume_experience)
};
export default ResumeValidation;
