import resumeEducationController from '../controllers/resume_education.controller';
import ResumeValidation from '../validations/resume.validation';
import Express from 'express';

const router = Express.Router();
router.get('/getAll/:id', resumeEducationController.getAll);

router.get('/:id', resumeEducationController.getOne);
router.post('', ResumeValidation.resume_education, resumeEducationController.create);
router.patch('/:id', ResumeValidation.resume_education, resumeEducationController.update);
router.delete('/:id', resumeEducationController.delete);

export default router;
