import Express from 'express';
import benefitsController from '../controllers/benefits.controller';
import AuthMiddleWare from '../middleware/authMiddleware';

const router = Express.Router();
router.get('', benefitsController.getAll);
router.get('/:id', benefitsController.getOne);
router.post('', AuthMiddleWare.protect, benefitsController.create);
router.patch('/:id', AuthMiddleWare.protect, benefitsController.update);
router.delete('/:id', AuthMiddleWare.protect, benefitsController.delete);

export default router;
