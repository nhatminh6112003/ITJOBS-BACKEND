import express from "express";
import AuthMiddleWear from "@src/middleware/authMiddlewear";
import authController from "@src/controllers/auth.controller";
import authValidation from "@src/validations/auth/auth.validation";
const router = express.Router();


router.post("/refresh-token",authController.refreshToken);
router.post("/register",authValidation.register,authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

export default router;
