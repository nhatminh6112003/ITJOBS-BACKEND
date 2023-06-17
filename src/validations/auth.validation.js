import AuthSchema from '@src/schemas/auth.schema';
import validateRequest from '@src/helpers/validateRequest';
const { register, login } = AuthSchema;

const AuthValidation = {
	register: validateRequest(register),
	login: validateRequest(login)
};
export default AuthValidation;
