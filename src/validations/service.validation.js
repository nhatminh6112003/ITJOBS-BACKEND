import serviceSchema from '../schemas/service.schema';
import validateRequest from '../middleware/validateRequest';

const { service } = serviceSchema;

const ServiceValidation = {
	service: validateRequest(service)
};
export default ServiceValidation;
