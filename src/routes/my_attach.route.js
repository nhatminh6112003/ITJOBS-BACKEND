import myAttachController from '../controllers/my_attach.controller';
import Express from 'express';
import uploadMulter from '../helpers/uploadMulter';

const router = Express.Router();
router.get('/getAll/:id', myAttachController.getAll);
router.get('/:id', myAttachController.getOne);
router.post('',uploadMulter.single('file'), myAttachController.create);
router.patch('/:id',uploadMulter.single('file'), myAttachController.update);
router.delete('/:id', myAttachController.delete);

export default router;
