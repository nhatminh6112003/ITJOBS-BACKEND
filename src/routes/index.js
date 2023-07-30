import express from 'express';
import UserRoutes from './users.route.js';
import AuthRoutes from './auth.route.js';
import ResumeRoutes from './resume.route.js';
import resumeLanguageRoutes from './resume_language.route';
import resumeSkillRoutes from './resume_skill.route.js';
import resumeEducationRoutes from './resume_education.route.js';
import resumeCertificateRoutes from './resume_certificate.route.js';
import resumeReferRoutes from './resume_refer.route.js';
import resumeTemplateRoutes from "./resume_template.route"
import resumeDesiredJobRoutes from "./resume_desired_job.route"
import cvTemplateRoutes from './cv_template.route.js';

function route(app) {
	const apiRoutes = express.Router();
	apiRoutes.use('/users', UserRoutes);
	apiRoutes.use('/auth', AuthRoutes);
	apiRoutes.use('/cv_template',cvTemplateRoutes );
	apiRoutes.use('/resume', ResumeRoutes);
	apiRoutes.use('/resume_language', resumeLanguageRoutes);
	apiRoutes.use('/resume_skill', resumeSkillRoutes);
	apiRoutes.use('/resume_education', resumeEducationRoutes);
	apiRoutes.use('/resume_certificate', resumeCertificateRoutes);
	apiRoutes.use('/resume_refer', resumeReferRoutes);
	apiRoutes.use('/resume_template', resumeTemplateRoutes);
	apiRoutes.use('/resume_desired_job', resumeDesiredJobRoutes);


	app.use('/api', apiRoutes);
}
export default route;
