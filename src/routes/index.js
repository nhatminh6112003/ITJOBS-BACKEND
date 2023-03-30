import userRoutes from "./user.route.js";
import authRoutes from './auth.route.js';
import express from "express";
function route(app) {
    const apiRoutes = express.Router();
    apiRoutes.use('/users',userRoutes);
    apiRoutes.use('/auth',authRoutes);    
    app.use('/api', apiRoutes);
}
export default route