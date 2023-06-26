import UserRoutes from './users.route.js';
import AuthRoutes from './auth.route.js';
import ResumeRoutes from './resume.route.js';
import express from 'express';
function route(app) {
	const apiRoutes = express.Router();
	apiRoutes.use('/users', UserRoutes);
	apiRoutes.use('/auth', AuthRoutes);
	apiRoutes.use('/resume', ResumeRoutes);

	app.use('/api', apiRoutes);
}
export default route;
