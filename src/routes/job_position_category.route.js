import UserRoleEnum from '@src/constants/userRoles';
import job_positionCategoryController from '@src/controllers/job_position_category.controller';
import AuthMiddleWare from '@src/middleware/authMiddleware';
import job_positionCategoryValidation from '@src/validations/job_positionCategory.validation';

import Express from 'express';

const router = Express.Router();
router.get('', job_positionCategoryController.getAll);
router.post(
	'',
	AuthMiddleWare.protect,
	AuthMiddleWare.authPage([UserRoleEnum.ADMIN]),
	job_positionCategoryValidation.job_positionCategory,
	job_positionCategoryController.create
);
router.patch(
	'/:id',
	AuthMiddleWare.protect,
	AuthMiddleWare.authPage([UserRoleEnum.ADMIN]),
	job_positionCategoryValidation.job_positionCategory,
	job_positionCategoryController.update
);
router.delete(
	'/:id',
	AuthMiddleWare.protect,
	AuthMiddleWare.authPage([UserRoleEnum.ADMIN]),
	job_positionCategoryController.delete
);

export default router;
