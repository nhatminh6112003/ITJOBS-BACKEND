import Express from 'express';
import resumeDesiredJobController from '../controllers/resume_desired_job.controller';

const router = Express.Router();
router.get('/:id', resumeDesiredJobController.getOne);
router.patch('/:resume_id', resumeDesiredJobController.update);
router.post('/', resumeDesiredJobController.create);
router.delete('/:id', resumeDesiredJobController.delete);

export default router;
