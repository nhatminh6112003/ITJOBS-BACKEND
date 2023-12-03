import Express from 'express';
import professionController from '../controllers/profession.controller';
import ProfessionValidation from '../validations/profession.validation';

import AuthMiddleWare from '../middleware/authMiddleware';

const router = Express.Router();
router.get('', professionController.getAll);
router.get('/analysisProfession', professionController.analysisProfession);
router.get('/:id', professionController.getOne);
router.post('', AuthMiddleWare.protect, ProfessionValidation.profession, professionController.create);
router.patch('/:id', AuthMiddleWare.protect, ProfessionValidation.profession, professionController.update);
router.delete('/:id', AuthMiddleWare.protect, professionController.delete);

export default router;
