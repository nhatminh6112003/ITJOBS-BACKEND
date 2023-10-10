import resume_languageController from '@src/controllers/resume_language.controller';
import ResumeValidation from '@src/validations/resume.validation';
import Express from 'express';

const router = Express.Router();

router.post('', ResumeValidation.resume_language, resume_languageController.create);
router.patch('/:id', ResumeValidation.resume_language, resume_languageController.update);
router.get('/:id', resume_languageController.getOne);
router.get('/getAll/:id', resume_languageController.getAll);
router.delete('/:id', resume_languageController.delete);

export default router;
