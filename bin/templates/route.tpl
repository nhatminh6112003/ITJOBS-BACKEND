import {{controllerName}}Controller from '../controllers/{{controllerName}}.controller';
import AuthMiddleWare from '../middleware/authMiddleware';

import Express from 'express';

const router = Express.Router();
router.get('', {{controllerName}}Controller.getAll);
router.get('/:id', {{controllerName}}Controller.getOne);
router.post(
	'',
	AuthMiddleWare.protect,
	{{controllerName}}Controller.create
);
router.patch(
	'/:id',
	AuthMiddleWare.protect,
	{{controllerName}}Controller.update
);
router.delete(
	'/:id',
	AuthMiddleWare.protect,
	{{controllerName}}Controller.delete
);

export default router;
