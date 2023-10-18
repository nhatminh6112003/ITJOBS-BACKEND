import job_welfare_detailController from '@src/controllers/job_welfare_detail.controller';
import Express from 'express';

const router = Express.Router();
router.get('/getAll/:id',job_welfare_detailController.getAll);
router.get('/:id',job_welfare_detailController.getOne);
router.post('',job_welfare_detailController.create);
router.patch('/:id',job_welfare_detailController.update);
router.delete('/:id',job_welfare_detailController.delete);

export default router;