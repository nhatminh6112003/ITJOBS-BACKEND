import resumeTemplateController from '../controllers/resume_template.controller';
import Express from 'express';
import ResumeValidation from '../validations/resume.validation';

const { resume_template } = ResumeValidation;
const router = Express.Router();
router.get('/:resume_id', resumeTemplateController.getOne);

router.patch('/update-ui-cv/:resume_id', resume_template.updateUi, resumeTemplateController.updateUI);
router.patch(
	'/update-template/:resume_id',
	resume_template.updateTemplate,
	resumeTemplateController.changeTemplate
);

export default router;
