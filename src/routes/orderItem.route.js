import Express from 'express';
import orderItemController from '../controllers/orderItem.controller';
import AuthMiddleWare from '../middleware/authMiddleware';


const router = Express.Router();
router.get('', orderItemController.getAll);
router.get('/:id', orderItemController.getOne);
router.post(
	'',
	AuthMiddleWare.protect,
	orderItemController.create
);
router.patch(
	'/:id',
	AuthMiddleWare.protect,
	orderItemController.update
);
router.delete(
	'/:id',
	AuthMiddleWare.protect,
	orderItemController.delete
);

export default router;
