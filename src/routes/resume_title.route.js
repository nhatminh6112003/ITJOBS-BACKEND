import express from 'express';
import UserRoleEnum from '../constants/userRoles';
import ResumeTitleController from '../controllers/resume_title.controller';
import ResumeValidation from '../validations/resume.validation';
import AuthMiddleWare from '../middleware/authMiddleware';

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
