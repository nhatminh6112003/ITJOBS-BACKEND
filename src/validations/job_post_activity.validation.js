import jobPostActivitySchema from '../schemas/job_post_activity.schema';
import validateRequest from '../middleware/validateRequest';

const { jobPostActivity } = jobPostActivitySchema;

const jobPostActivityValidation = {
	jobPostActivity: validateRequest(jobPostActivity)
};
export default jobPostActivityValidation;
