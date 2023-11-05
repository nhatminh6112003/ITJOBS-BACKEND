import price_listController from '@src/controllers/price_list.controller';
import AuthMiddleWare from '@src/middleware/authMiddleware';

import Express from 'express';

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
