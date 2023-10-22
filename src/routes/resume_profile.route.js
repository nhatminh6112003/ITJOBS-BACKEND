import ResumeProfileController from '@src/controllers/resume_profile.controller';
import ResumeValidation from '@src/validations/resume.validation';
import Express from 'express';

const router = Express.Router();
router.get('/:user_id', ResumeProfileController.getOne);
router.patch('/:resume_id', ResumeValidation.resume_profile, ResumeProfileController.update);

export default router;
