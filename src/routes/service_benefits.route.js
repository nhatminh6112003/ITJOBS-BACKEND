import Express from 'express';
import service_benefitsController from '../controllers/service_benefits.controller';

const router = Express.Router();
router.get('', service_benefitsController.getAll);
router.get('/:id', service_benefitsController.getOne);
router.post('', service_benefitsController.create);
router.patch('/:id', service_benefitsController.update);
router.delete('/:id', service_benefitsController.delete);

export default router;
