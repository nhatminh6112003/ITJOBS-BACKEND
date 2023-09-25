import jobWelfareSchema from '@src/schemas/job_welfare.schema';
import validateRequest from '@src/middleware/validateRequest';

const { jobWelfare } = jobWelfareSchema;

const jobWelfareValidation = {
	jobWelfare: validateRequest(jobWelfare)
};
export default jobWelfareValidation;
