import employer_resumeController from '@src/controllers/employer_resume.controller';
import AuthMiddleWare from '@src/middleware/authMiddleware';

import Express from 'express';

const router = Express.Router();
router.get('', employer_resumeController.getAll);
router.get('/:id', employer_resumeController.getOne);
router.post(
	'',
	AuthMiddleWare.protect,
	employer_resumeController.create
);
router.patch(
	'/:id',
	AuthMiddleWare.protect,
	employer_resumeController.update
);
router.delete(
	'/:id',
	AuthMiddleWare.protect,
	employer_resumeController.delete
);

export default router;
