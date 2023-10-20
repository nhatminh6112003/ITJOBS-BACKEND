import jobPostSchema from '@src/schemas/job_post.schema';
import validateRequest from '@src/middleware/validateRequest';

const { jobPost } = jobPostSchema;

const jobPostValidation = {
	jobPost: validateRequest(jobPost)
};
export default jobPostValidation;
