import job_welfareController from '@src/controllers/job_welfare.controller';
import Express from 'express';

const router = Express.Router();
router.get('', job_welfareController.getAll);
router.post('', job_welfareController.create);
router.patch('/:id', job_welfareController.update);
router.get('/:id', job_welfareController.getOne);
router.delete('/:id', job_welfareController.delete);

export default router;