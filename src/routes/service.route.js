import serviceController from '@src/controllers/service.controller';
import ServiceValidation from '@src/validations/service.validation';
import Express from 'express';

const router = Express.Router();
router.get('/', serviceController.getAll);
router.get('/:service_type_id', serviceController.getAllByServiceType);
router.post('/create_payment_url', serviceController.createPaymentUrl)
router.get('/:id', serviceController.getOne);
router.post('', ServiceValidation.service, serviceController.create);
router.patch('/:id', ServiceValidation.service, serviceController.update);
router.delete('/:id', serviceController.delete);

export default router;
