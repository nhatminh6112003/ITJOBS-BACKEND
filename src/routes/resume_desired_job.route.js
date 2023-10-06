import resumeDesiredJobController from "@src/controllers/resume_desired_job.controller";
import Express from 'express';
import ResumeValidation from "@src/validations/resume.validation";

const router = Express.Router();
router.get('/:id', resumeDesiredJobController.getOne);
router.patch('/:resume_id',ResumeValidation.resume_desired_job,resumeDesiredJobController.update);
router.post('/', resumeDesiredJobController.create);
router.delete('/:id', resumeDesiredJobController.delete);

export default router;
