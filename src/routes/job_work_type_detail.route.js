import jobWorkTypeDetailController from '@src/controllers/job_work_type_detail.controller';
import Express from 'express';

const router = Express.Router();

router.post('', jobWorkTypeDetailController.create);
router.get('', jobWorkTypeDetailController.getAll);
router.get('/:id', jobWorkTypeDetailController.getOne);
router.patch('/:id', jobWorkTypeDetailController.update);
router.delete('/:id', jobWorkTypeDetailController.delete);

export default router;
