import express from 'express';
import UserRoutes from './users.route.js';
import AuthRoutes from './auth.route.js';
import resumeRoutes from './resume.route.js';
import resumeLanguageRoutes from './resume_language.route';
import resumeSkillRoutes from './resume_skill.route.js';
import resumeEducationRoutes from './resume_education.route.js';
import resumeCertificateRoutes from './resume_certificate.route.js';
import resumeReferRoutes from './resume_refer.route.js';
import resumeTemplateRoutes from "./resume_template.route"
import resumeDesiredJobRoutes from "./resume_desired_job.route";
import resumeTitleRoutes from "./resume_title.route"
import cvTemplateRoutes from './cv_template.route.js';
import resumeObjectiveRoutes from './resume_objective.route.js'

function route(app) {
	const apiRoutes = express.Router();
	apiRoutes.use('/users', UserRoutes);
	apiRoutes.use('/auth', AuthRoutes);
	apiRoutes.use('/cv_template',cvTemplateRoutes );
	apiRoutes.use('/resume', resumeRoutes);
	apiRoutes.use('/resume_title', resumeTitleRoutes);
	apiRoutes.use('/resume_language', resumeLanguageRoutes);
	apiRoutes.use('/resume_skill', resumeSkillRoutes);
	apiRoutes.use('/resume_education', resumeEducationRoutes);
	apiRoutes.use('/resume_certificate', resumeCertificateRoutes);
	apiRoutes.use('/resume_refer', resumeReferRoutes);
	apiRoutes.use('/resume_template', resumeTemplateRoutes);
	apiRoutes.use('/resume_desired_job', resumeDesiredJobRoutes);
	apiRoutes.use('/resume_objective', resumeObjectiveRoutes);


	app.use('/api', apiRoutes);
}
export default route;
