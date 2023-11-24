import resumeReferController from '../controllers/resume_refer.controller';
import ResumeValidation from '../validations/resume.validation';
import Express from 'express';

const router = Express.Router();
router.get('/getAll/:id', resumeReferController.getAll);
router.get('/:id', resumeReferController.getOne);
router.post('', ResumeValidation.resume_refer, resumeReferController.create);
router.patch('/:id', ResumeValidation.resume_refer, resumeReferController.update);
router.delete('/:id', resumeReferController.delete);

export default router;
