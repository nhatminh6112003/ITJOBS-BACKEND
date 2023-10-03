import workTypeController from '@src/controllers/work_type.controller';
import Express from 'express';

const router = Express.Router();
router.get('/', workTypeController.getAll);

export default router;
