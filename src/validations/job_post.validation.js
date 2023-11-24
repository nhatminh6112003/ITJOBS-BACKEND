import jobPostSchema from '../schemas/job_post.schema';
import validateRequest from '../middleware/validateRequest';

const { jobPost } = jobPostSchema;

const jobPostValidation = {
	jobPost: validateRequest(jobPost)
};
export default jobPostValidation;
