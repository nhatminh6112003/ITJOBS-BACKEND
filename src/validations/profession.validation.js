import ProfessionSchema from '../schemas/profession.schema';
import validateRequest from '../middleware/validateRequest';

const { profession } = ProfessionSchema;

const ProfessionValidation = {
	profession: validateRequest(profession)
};
export default ProfessionValidation;
