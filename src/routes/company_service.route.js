import Express from 'express';
import companyServiceController from '../controllers/company_service.controller';

const router = Express.Router();
router.get('/', companyServiceController.getAll);

router.get('/analysis/:id', companyServiceController.analysis);
router.get('/:id', companyServiceController.getOne);
router.post('', companyServiceController.create);
router.patch('/:id', companyServiceController.update);
router.delete('/:id', companyServiceController.delete);

export default router;
