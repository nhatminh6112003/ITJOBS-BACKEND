import UserRoutes from './users.route.js';
import AuthRoutes from './auth.route.js';
import express from 'express';
function route(app) {
	const apiRoutes = express.Router();
	apiRoutes.use('/users', UserRoutes);
	apiRoutes.use('/auth', AuthRoutes);
	app.use('/api', apiRoutes);
}
export default route;
