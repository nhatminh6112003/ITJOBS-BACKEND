import jobPostActivityController from '../controllers/job_post_activity.controller';
import Express from 'express';
import jobPostActivityValidation from '../validations/job_post_activity.validation';

const router = Express.Router();

router.post('', jobPostActivityValidation.jobPostActivity, jobPostActivityController.create);
router.post('/send-mail-jobSeeker', jobPostActivityController.sendMailJobSeeker);
router.get('', jobPostActivityController.getAll);
router.get('/analysis/:id', jobPostActivityController.analysis);

router.get('/:id', jobPostActivityController.getOne);
router.patch('/:id', jobPostActivityValidation.jobPostActivity, jobPostActivityController.update);
router.patch('/update-status-resume/:id', jobPostActivityController.updateStatusResume);

router.delete('/:id', jobPostActivityController.delete);

export default router;
