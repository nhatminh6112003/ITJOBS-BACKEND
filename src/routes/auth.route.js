import express from 'express';
import AuthController from '@src/controllers/auth.controller';
import AuthValidation from '@src/validations/auth.validation';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/refresh-token', asyncHandler(AuthController.refreshToken));
router.post('/register', AuthValidation.register, AuthController.register);
router.post('/login', AuthValidation.login, AuthController.login);

export default router;
