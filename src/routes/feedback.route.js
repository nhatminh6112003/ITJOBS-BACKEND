import Express from 'express';
import feedbackController from '../controllers/feedback.controller';

const router = Express.Router();
router.get('', feedbackController.getAll);
router.get('/:id', feedbackController.getOne);
router.post('', feedbackController.create);
router.patch('/:id', feedbackController.update);
router.delete('/:id', feedbackController.delete);

export default router;
