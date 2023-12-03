import Express from 'express';
import job_welfareController from '../controllers/job_welfare.controller';

const router = Express.Router();
router.get('', job_welfareController.getAll);
router.get('/:id', job_welfareController.getOne);
router.post('', job_welfareController.create);
router.patch('/:id', job_welfareController.update);
router.delete('/:id', job_welfareController.delete);

export default router;
