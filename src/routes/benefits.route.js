import benefitsController from '@src/controllers/benefits.controller';
import AuthMiddleWare from '@src/middleware/authMiddleware';

import Express from 'express';

const router = Express.Router();
router.get('', benefitsController.getAll);
router.get('/:id', benefitsController.getOne);
router.post(
	'',
	AuthMiddleWare.protect,
	benefitsController.create
);
router.patch(
	'/:id',
	AuthMiddleWare.protect,
	benefitsController.update
);
router.delete(
	'/:id',
	AuthMiddleWare.protect,
	benefitsController.delete
);

export default router;
