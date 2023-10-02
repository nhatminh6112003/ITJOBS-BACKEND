import resume_objectiveController from '@src/controllers/resume_objective.controller';
import ResumeValidation from '@src/validations/resume.validation';
import Express from 'express';

const router = Express.Router();

router.post('', ResumeValidation.resume_objective, resume_objectiveController.create);
router.patch('/:id', ResumeValidation.resume_objective, resume_objectiveController.update);
router.get('/getAll/:id', resume_objectiveController.getAll);
router.get('/:id', resume_objectiveController.getOne);

router.delete('/:id', resume_objectiveController.delete);

export default router;