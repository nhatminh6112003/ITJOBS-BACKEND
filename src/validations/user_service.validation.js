import userServiceSchema from '../schemas/user_service.schema';
import validateRequest from '../middleware/validateRequest';

const { userService } = userServiceSchema;

const userServiceValidation = {
	userService: validateRequest(userService)
};
export default userServiceValidation;
