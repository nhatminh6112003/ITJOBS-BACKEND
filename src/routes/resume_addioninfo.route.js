import resumeAddioninfoController from '@src/controllers/resume_addioninfo.controller';
import ResumeValidation from '@src/validations/resume.validation';
import Express from 'express';

const router = Express.Router();
router.get('/:id', resumeAddioninfoController.getOne);
router.post('', ResumeValidation.resume_addioninfo, resumeAddioninfoController.create);
router.patch('/:id', ResumeValidation.resume_addioninfo, resumeAddioninfoController.update);
router.delete('/:id', resumeAddioninfoController.delete);

export default router;