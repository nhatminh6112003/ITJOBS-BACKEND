import ProfessionSchema from '@src/schemas/profession.schema';
import validateRequest from '@src/middleware/validateRequest';

const { profession } = ProfessionSchema;

const ProfessionValidation = {
	profession: validateRequest(profession)
};
export default ProfessionValidation;
