import jobPostActivitySchema from '@src/schemas/job_post_activity.schema';
import validateRequest from '@src/middleware/validateRequest';

const { jobPostActivity } = jobPostActivitySchema;

const jobPostActivityValidation = {
	jobPostActivity: validateRequest(jobPostActivity)
};
export default jobPostActivityValidation;
