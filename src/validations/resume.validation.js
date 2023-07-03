import validateRequest from '@src/middleware/validateRequest';
import ResumeSchema from '@src/schemas/resume.schema';

const { resume_title, resume_profile, resume_language, resume_skill, resume_education } = ResumeSchema;

const ResumeValidation = {
	resume_title: validateRequest(resume_title),
	resume_profile: validateRequest(resume_profile),
	resume_language: validateRequest(resume_language),
	resume_skill: validateRequest(resume_skill),
	resume_education: validateRequest(resume_education)
};
export default ResumeValidation;
