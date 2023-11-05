import userServiceController from '@src/controllers/user_service.controller';
import userServiceValidation from '@src/validations/user_service.validation';
import Express from 'express';

const router = Express.Router();
router.get('/', userServiceController.getAll);

router.get('/:id', userServiceController.getOne);
router.post('', userServiceValidation.userService, userServiceController.create);
router.patch('/:id', userServiceValidation.userService, userServiceController.update);
router.delete('/:id', userServiceController.delete);

export default router;
