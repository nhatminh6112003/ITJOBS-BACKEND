import companyController from '@src/controllers/company.controller';
import Express from 'express';

const router = Express.Router();

router.post('', companyController.create);
router.get('', companyController.getAll);
router.get('/:id', companyController.getOne);
router.patch('/:id',companyController.update);
router.delete('/:id', companyController.delete);

export default router;
