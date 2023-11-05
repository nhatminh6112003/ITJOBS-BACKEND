import serviceSchema from '@src/schemas/service.schema';
import validateRequest from '@src/middleware/validateRequest';

const { service } = serviceSchema;

const ServiceValidation = {
	service: validateRequest(service)
};
export default ServiceValidation;
