import resumeWorkTypeController from '../controllers/resume_work_type.controller';
import ResumeValidation from '../validations/resume.validation';
import Express from 'express';

const router = Express.Router();
router.get('/:id', resumeWorkTypeController.getOne);
router.post('', ResumeValidation.resume_work_type, resumeWorkTypeController.create);
router.patch('/:id', ResumeValidation.resume_work_type, resumeWorkTypeController.update);
router.delete('/:id', resumeWorkTypeController.delete);

export default router;