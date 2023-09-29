import resumeWorkTypeController from '@src/controllers/resume_work_type.controller';
import ResumeValidation from '@src/validations/resume.validation';
import Express from 'express';

const router = Express.Router();
router.get('/:id', resumeWorkTypeController.getOne);
router.post('', ResumeValidation.resume_work_type, resumeWorkTypeController.create);
router.patch('/:id', ResumeValidation.resume_work_type, resumeWorkTypeController.update);
router.delete('/:id', resumeWorkTypeController.delete);

export default router;