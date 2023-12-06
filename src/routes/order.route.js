import Express from 'express';
import orderController from '../controllers/order.controller';

const router = Express.Router();
router.get('', orderController.getAll);
router.get('/analysis', orderController.analysis);
router.get('/:id', orderController.getOne);
router.post('', orderController.create);
router.patch('/:id', orderController.update);
router.delete('/:id', orderController.delete);

export default router;
