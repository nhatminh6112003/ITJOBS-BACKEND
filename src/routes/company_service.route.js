import companyServiceController from '@src/controllers/company_service.controller';
import Express from 'express';

const router = Express.Router();
router.get('/', companyServiceController.getAll);

router.get('/:id', companyServiceController.getOne);
router.post('', companyServiceController.create);
router.patch('/:id', companyServiceController.update);
router.delete('/:id', companyServiceController.delete);

export default router;
