import resumeExperienceController from '@src/controllers/resume_experience.controller';
import ResumeValidation from '@src/validations/resume.validation';
import Express from 'express';

const router = Express.Router();
router.get('/getAll/:id', resumeExperienceController.getAll);

router.get('/:id', resumeExperienceController.getOne);
router.post('', ResumeValidation.resume_experience, resumeExperienceController.create);
router.patch('/:id', ResumeValidation.resume_experience, resumeExperienceController.update);
router.delete('/:id', resumeExperienceController.delete);

export default router;
