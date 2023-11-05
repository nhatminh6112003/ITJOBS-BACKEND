import userServiceSchema from '@src/schemas/user_service.schema';
import validateRequest from '@src/middleware/validateRequest';

const { userService } = userServiceSchema;

const userServiceValidation = {
	userService: validateRequest(userService)
};
export default userServiceValidation;
