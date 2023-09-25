import job_positionCategorySchema from '@src/schemas/job_positionCategory.schema';
import validateRequest from '@src/middleware/validateRequest';

const { job_positionCategory } = job_positionCategorySchema;

const job_positionCategoryValidation = {
	job_positionCategory: validateRequest(job_positionCategory)
};
export default job_positionCategoryValidation;
