import job_profession_detailController from '../controllers/job_profession_detail.controller';
import Express from 'express';

const router = Express.Router();
router.get('/getAll/:id',job_profession_detailController.getAll);
router.get('/:id',job_profession_detailController.getOne);
router.post('',job_profession_detailController.create);
router.patch('/:id',job_profession_detailController.update);
router.delete('/:id',job_profession_detailController.delete);

export default router;