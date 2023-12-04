import Express from 'express';
import orderController from '../controllers/order.controller';
import AuthMiddleWare from '../middleware/authMiddleware';

const router = Express.Router();
router.get('', orderController.getAll);
router.get('/:id', orderController.getOne);
router.post('', AuthMiddleWare.protect, orderController.create);
router.patch('/:id', AuthMiddleWare.protect, orderController.update);
router.delete('/:id', AuthMiddleWare.protect, orderController.delete);

export default router;
