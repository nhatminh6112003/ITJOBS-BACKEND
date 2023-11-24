import price_listController from '../controllers/price_list.controller';
import Express from 'express';
import AuthMiddleWare from '../middleware/authMiddleware';


const router = Express.Router();
router.get('', price_listController.getAll);
router.get('/:id', price_listController.getOne);
router.post(
	'',
	AuthMiddleWare.protect,
	price_listController.create
);
router.patch(
	'/:id',
	AuthMiddleWare.protect,
	price_listController.update
);
router.delete(
	'/:id',
	AuthMiddleWare.protect,
	price_listController.delete
);

export default router;
