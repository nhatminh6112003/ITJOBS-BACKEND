import jobPostController from '@src/controllers/job_post.controller';
import Express from 'express';
import jobPostValidation from '@src/validations/job_post.validation';

const router = Express.Router();
router.get('/analytics', jobPostController.analytic);
router.get('/analytics/calculateCorrelationIndex', jobPostController.calculateCorrelationIndex);
router.get('/analytics/analyticJobSeekerApplyByDay', jobPostController.analyticJobSeekerApplyByDay);
router.get('/analytics/analyticResumeStatus', jobPostController.analyticResumeStatus);
router.get('/analytics/analyticDegreeValue', jobPostController.analyticDegreeValue);
router.get('', jobPostController.getAll);
router.get('/:id', jobPostController.getOne);
router.post('', jobPostValidation.jobPost, jobPostController.create);
router.patch('/:id', jobPostController.update);
router.delete('/:id', jobPostController.delete);

export default router;
