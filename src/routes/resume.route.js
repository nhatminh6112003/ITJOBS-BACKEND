import express from 'express';
import UserRoleEnum from '@src/constants/userRoles';
import AuthMiddleWare from '@src/middleware/authMiddleware';
import ResumeTitleController from '@src/controllers/resume_title.controller';
import ResumeController from '@src/controllers/resume.controller';
import ResumeProfileController from '@src/controllers/resume_profile.controller';
import ResumeValidation from '@src/validations/resume.validation';


const router = express.Router();

router.get('/', AuthMiddleWare.protect, AuthMiddleWare.authPage([UserRoleEnum.ADMIN]), ResumeController.getAll);
router.get('/:id', AuthMiddleWare.protect, AuthMiddleWare.authPage([UserRoleEnum.ADMIN]), ResumeController.getOne);

router.patch(
	'/update-resume-title/:resume_id',
	AuthMiddleWare.protect,
	AuthMiddleWare.authPage([UserRoleEnum.JOBSEEKER]),
	ResumeValidation.resume_title,
	ResumeTitleController.update
);

router.patch(
	'/update-resume-profile/:resume_id',
	AuthMiddleWare.protect,
	AuthMiddleWare.authPage([UserRoleEnum.JOBSEEKER]),
	ResumeValidation.resume_profile,
	ResumeProfileController.update
);

export default router;
