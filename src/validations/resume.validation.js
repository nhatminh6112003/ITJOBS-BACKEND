import validateRequest from '@src/middleware/validateRequest';
import ResumeSchema from '@src/schemas/resume.schema';

const { resume_title, resume_profile, resume_language } = ResumeSchema;

const ResumeValidation = {
	resume_title: validateRequest(resume_title),
	resume_profile: validateRequest(resume_profile),
	resume_language: validateRequest(resume_language)
};
export default ResumeValidation;
