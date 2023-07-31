import express from 'express';
import UserRoleEnum from '@src/constants/userRoles';
import AuthMiddleWare from '@src/middleware/authMiddleware';
import ResumeTitleController from '@src/controllers/resume_title.controller';
import ResumeValidation from '@src/validations/resume.validation';

const router = express.Router();
router.get(
	'/:resume_id',
	AuthMiddleWare.protect,
	AuthMiddleWare.authPage([UserRoleEnum.JOBSEEKER]),
	ResumeTitleController.getOne
);
router.patch(
	'/:resume_id',
	AuthMiddleWare.protect,
	AuthMiddleWare.authPage([UserRoleEnum.JOBSEEKER]),
	ResumeValidation.resume_title,
	ResumeTitleController.update
);


export default router;
