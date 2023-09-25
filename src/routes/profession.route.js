import professionController from '@src/controllers/profession.controller';
import ProfessionValidation from '@src/validations/profession.validation';
import AuthMiddleWare from '@src/middleware/authMiddleware';

import Express from 'express';
import UserRoleEnum from '@src/constants/userRoles';

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
