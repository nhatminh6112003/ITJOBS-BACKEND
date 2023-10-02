import Express from 'express';
import ResumeValidation from '@src/validations/resume.validation';
import resumeActivityController from '@src/controllers/resume_activity.controller';

const router = Express.Router();
router.get('/getAll/:id', resumeActivityController.getAll);

router.get('/:id', resumeActivityController.getOne);
router.post('', ResumeValidation.resume_activity, resumeActivityController.create);
router.patch('/:id', ResumeValidation.resume_activity, resumeActivityController.update);
router.delete('/:id', resumeActivityController.delete);

export default router;
