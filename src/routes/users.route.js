import express from 'express';
import UserController from '../controllers/user.controller';

const router = express.Router();

router.get(
	'',
	// AuthMiddleWare.protect,
	// AuthMiddleWare.authPage([UserRoleEnum.ADMIN]),

	UserController.getAll
);
router.get('/:id', UserController.getOne);
router.patch('/changePassword/:id', UserController.changePassword);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.delete);

router.get('/viewpdf', UserController.viewPdf);
router.post('/generatePdf', UserController.downloadPdf);

// Middleware upload.single('image') sẽ lấy hình ảnh được upload từ form có name là 'image' và lưu trữ trong một biến req.file

export default router;
