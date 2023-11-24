import express from 'express';
import UserRoleEnum from '../constants/userRoles';
import AuthMiddleWare from '../middleware/authMiddleware';
import ResumeTitleController from '../controllers/resume_title.controller';
import ResumeController from '../controllers/resume.controller';
import ResumeProfileController from '../controllers/resume_profile.controller';
import ResumeValidation from '../validations/resume.validation';

const router = express.Router();

router.get('/', AuthMiddleWare.protect, ResumeController.getAll);
router.get('/:id', ResumeController.getOne);
router.get(
	'/resume-profile/:user_id',
	AuthMiddleWare.protect,
	AuthMiddleWare.authPage([UserRoleEnum.JOBSEEKER]),
	ResumeProfileController.getOne
);
router.post('', ResumeController.create);

router.patch('/:id', ResumeController.update);

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
router.delete('/:id', ResumeController.delete);

export default router;
