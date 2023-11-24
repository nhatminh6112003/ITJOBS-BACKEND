import professionController from '../controllers/profession.controller';
import ProfessionValidation from '../validations/profession.validation';

import Express from 'express';
import UserRoleEnum from '../constants/userRoles';
import AuthMiddleWare from '../middleware/authMiddleware';

const router = Express.Router();
router.get('', professionController.getAll);
router.get('/:id', professionController.getOne);
router.post(
	'',
	AuthMiddleWare.protect,
	ProfessionValidation.profession,
	AuthMiddleWare.authPage([UserRoleEnum.ADMIN]),
	professionController.create
);
router.patch(
	'/:id',
	AuthMiddleWare.protect,
	ProfessionValidation.profession,
	AuthMiddleWare.authPage([UserRoleEnum.ADMIN]),
	professionController.update
);
router.delete(
	'/:id',
	AuthMiddleWare.protect,
	AuthMiddleWare.authPage([UserRoleEnum.ADMIN]),
	professionController.delete
);

export default router;
