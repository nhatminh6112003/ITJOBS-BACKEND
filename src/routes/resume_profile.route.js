import ResumeProfileController from '../controllers/resume_profile.controller';
import ResumeValidation from '../validations/resume.validation';
import Express from 'express';

const router = Express.Router();
router.get('/:user_id', ResumeProfileController.getOne);
router.patch('/:user_id', ResumeValidation.resume_profile, ResumeProfileController.update);

export default router;
