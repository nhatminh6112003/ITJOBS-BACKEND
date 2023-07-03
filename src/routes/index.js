import express from 'express';
import UserRoutes from './users.route.js';
import AuthRoutes from './auth.route.js';
import ResumeRoutes from './resume.route.js';
import resumeLanguageRoutes from './resume_language.route';
import resumeSkillRoutes from './resume_skill.route.js';
import resumeEducationRoutes from './resume_education.route.js';

function route(app) {
	const apiRoutes = express.Router();
	apiRoutes.use('/users', UserRoutes);
	apiRoutes.use('/auth', AuthRoutes);
	apiRoutes.use('/resume', ResumeRoutes);
	apiRoutes.use('/resume_language', resumeLanguageRoutes);
	apiRoutes.use('/resume_skill', resumeSkillRoutes);
	apiRoutes.use('/resume_education', resumeEducationRoutes);

	app.use('/api', apiRoutes);
}
export default route;
