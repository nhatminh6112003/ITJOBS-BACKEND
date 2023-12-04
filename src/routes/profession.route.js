import Express from 'express';
import professionController from '../controllers/profession.controller';
import ProfessionValidation from '../validations/profession.validation';

const router = Express.Router();
router.get('', professionController.getAll);
router.get('/analysisProfession', professionController.analysisProfession);
router.get('/:id', professionController.getOne);
router.post('', ProfessionValidation.profession, professionController.create);
router.patch('/:id', ProfessionValidation.profession, professionController.update);
router.delete('/:id', professionController.delete);

export default router;
