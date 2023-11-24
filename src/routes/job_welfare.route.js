import UserRoleEnum from '../constants/userRoles';
import job_welfareController from '../controllers/job_welfare.controller';
import jobWelfareValidation from '../validations/job_welfare.validation';

import Express from 'express';
import AuthMiddleWare from '../middleware/authMiddleware';

const router = Express.Router();
router.get('', job_welfareController.getAll);
router.get('/:id', job_welfareController.getOne);
router.post(
	'',
	AuthMiddleWare.protect,
	AuthMiddleWare.authPage([UserRoleEnum.ADMIN]),
	jobWelfareValidation.jobWelfare,
	job_welfareController.create
);
router.patch(
	'/:id',
	AuthMiddleWare.protect,
	jobWelfareValidation.jobWelfare,
	AuthMiddleWare.authPage([UserRoleEnum.ADMIN]),
	job_welfareController.update
);
router.delete(
	'/:id',
	AuthMiddleWare.protect,
	AuthMiddleWare.authPage([UserRoleEnum.ADMIN]),
	job_welfareController.delete
);

export default router;
