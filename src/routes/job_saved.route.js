import job_savedController from '@src/controllers/job_saved.controller';
import Express from 'express';

const router = Express.Router();
router.get('/getAll/:id',job_savedController.getAll);
router.get('/analysis/:id',job_savedController.analysis);
router.get('/:id',job_savedController.getOne);
router.post('',job_savedController.create);
router.patch('/:id',job_savedController.update);
router.delete('/:id',job_savedController.delete);

export default router;