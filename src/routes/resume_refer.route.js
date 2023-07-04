import resumeReferController from '@src/controllers/resume_refer.controller';
import ResumeValidation from '@src/validations/resume.validation';
import Express from 'express';

const router = Express.Router();
router.get('/:id', resumeReferController.getOne);
router.post('', ResumeValidation.resume_refer, resumeReferController.create);
router.patch('/:id', ResumeValidation.resume_refer, resumeReferController.update);
router.delete('/:id', resumeReferController.delete);

export default router;
