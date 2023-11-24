import Express from 'express';
import workTypeController from "../controllers/work_type.controller";

const router = Express.Router();
router.get('/', workTypeController.getAll);

export default router;
