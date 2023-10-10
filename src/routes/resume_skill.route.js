import resumeSkillController from '@src/controllers/resume_skill.controller';
import ResumeValidation from '@src/validations/resume.validation';
import Express from 'express';

const router = Express.Router();
router.get('/getAll/:id', resumeSkillController.getAll);
router.get('/:id', resumeSkillController.getOne);
router.post('',ResumeValidation.resume_skill,resumeSkillController.create);
router.patch('/:id',ResumeValidation.resume_skill, resumeSkillController.update);
router.delete('/:id', resumeSkillController.delete);

export default router;
