import express from 'express';
import AuthMiddleWare from '@src/middleware/authMiddleware';
import UserController from '@src/controllers/user.controller';
import uploadCloud from '@src/middleware/uploadCloud';
import { cacheMiddleware } from '@src/middleware/cacheMiddleware';
import UserRoleEnum from '@src/constants/userRoles';
const router = express.Router();

router.get(
	'',
	AuthMiddleWare.protect,
	AuthMiddleWare.authPage([UserRoleEnum.JOBSEEKER]),
	cacheMiddleware('2 minutes'),
	UserController.getAll
);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.delete);

router.get('/downloadCvProfile', UserController.downloadCvProfile);
router.get('/viewpdf', UserController.viewPdf);
router.post('/generatePdf', UserController.dowloadPdf);

// Middleware upload.single('image') sẽ lấy hình ảnh được upload từ form có name là 'image' và lưu trữ trong một biến req.file

export default router;
