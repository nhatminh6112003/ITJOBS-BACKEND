import Express from 'express';
import service_typeController from '../controllers/service_type.controller';

const router = Express.Router();

router.post('', service_typeController.create);
router.get('', service_typeController.getAll);
router.get('/:id', service_typeController.getOne);
router.patch('/:id', service_typeController.update);
router.delete('/:id', service_typeController.delete);

export default router;
