import jobPostActivityController from '@src/controllers/job_post_activity.controller';
import Express from 'express';
import jobPostActivityValidation from '@src/validations/job_post_activity.validation';

const router = Express.Router();

router.post('', jobPostActivityValidation.jobPostActivity, jobPostActivityController.create);
router.get('', jobPostActivityController.getAll);
router.get('/:id', jobPostActivityController.getOne);
router.patch('/:id', jobPostActivityValidation.jobPostActivity, jobPostActivityController.update);
router.patch('/update-status-resume/:id', jobPostActivityController.updateStatusResume);
router.delete('/:id', jobPostActivityController.delete);

export default router;
