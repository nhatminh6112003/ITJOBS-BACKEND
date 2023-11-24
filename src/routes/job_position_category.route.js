import UserRoleEnum from '../constants/userRoles';
import job_positionCategoryController from '../controllers/job_position_category.controller';
import job_positionCategoryValidation from '../validations/job_positionCategory.validation';

import Express from 'express';
import AuthMiddleWare from '../middleware/authMiddleware';

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
