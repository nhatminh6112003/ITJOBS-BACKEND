import jobWelfareSchema from '../schemas/job_welfare.schema';
import validateRequest from '../middleware/validateRequest';

const { jobWelfare } = jobWelfareSchema;

const jobWelfareValidation = {
	jobWelfare: validateRequest(jobWelfare)
};
export default jobWelfareValidation;
