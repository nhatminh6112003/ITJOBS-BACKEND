import feedbackController from '../controllers/feedback.controller';

import Express from 'express';

const router = Express.Router();
router.get('', feedbackController.getAll);
router.get('/:id', feedbackController.getOne);
router.post(
	'',
	feedbackController.create
);
router.patch(
	'/:id',
	feedbackController.update
);
router.delete(
	'/:id',
	feedbackController.delete
);

export default router;
