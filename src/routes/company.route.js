import companyController from '../controllers/company.controller';
import Express from 'express';
import uploadMulter from '../helpers/uploadMulter';

const router = Express.Router();

router.post('', companyController.create);
router.get('', companyController.getAll);
router.get('/:id', companyController.getOne);
router.patch('/:id', uploadMulter.array('files'), companyController.update);
router.delete('/:id', companyController.delete);

export default router;
