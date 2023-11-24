import express from 'express';
import asyncHandler from 'express-async-handler';
import AuthController from '../controllers/auth.controller';
import AuthValidation from '../validations/auth.validation';

const router = express.Router();

router.post('/refresh-token', asyncHandler(AuthController.refreshToken));
router.post('/register', AuthValidation.register, AuthController.register);
router.post('/login', AuthValidation.login, AuthController.login);

export default router;
