import job_positionCategoryController from '@src/controllers/job_position_category.controller';
import Express from 'express';

const router = Express.Router();
router.get('/:id', job_positionCategoryController.getOne);
router.post('', job_positionCategoryController.create);
router.patch('/:id', job_positionCategoryController.update);
router.delete('/:id', job_positionCategoryController.delete);

export default router;
