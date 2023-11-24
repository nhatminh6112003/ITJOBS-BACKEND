import AuthSchema from '../schemas/auth.schema';
import validateRequest from '../middleware/validateRequest';

const { register, login } = AuthSchema;

const AuthValidation = {
	register: validateRequest(register),
	login: validateRequest(login)
};
export default AuthValidation;
