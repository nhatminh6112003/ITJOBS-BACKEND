import Express from 'express';
import serviceController from '../controllers/service.controller';
import ServiceValidation from '../validations/service.validation';

const router = Express.Router();
router.get('/', serviceController.getAll);
router.get('/:service_type_id', serviceController.getAllByServiceType);
router.post('/create_payment_url', serviceController.createPaymentUrl);
router.get('/:id', serviceController.getOne);
router.post('', serviceController.create);
router.patch('/:id', serviceController.update);
router.delete('/:id', serviceController.delete);

export default router;
