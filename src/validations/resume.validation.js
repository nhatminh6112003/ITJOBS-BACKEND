import validateRequest from '@src/middleware/validateRequest';
import ResumeSchema from '@src/schemas/resume.schema';
const { resume_title,resume_profile } = ResumeSchema;

const ResumeValidation = {
	resume_title: validateRequest(resume_title),
   resume_profile:validateRequest(resume_profile)
};
export default ResumeValidation;
