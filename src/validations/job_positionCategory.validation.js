import job_positionCategorySchema from '../schemas/job_positionCategory.schema';
import validateRequest from '../middleware/validateRequest';

const { job_positionCategory } = job_positionCategorySchema;

const job_positionCategoryValidation = {
	job_positionCategory: validateRequest(job_positionCategory)
};
export default job_positionCategoryValidation;
