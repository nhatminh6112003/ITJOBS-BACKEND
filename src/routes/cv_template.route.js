import express from 'express';
import cv_templateController from '../controllers/cv_template.controller';
import cacheMiddleware from '../middleware/cacheMiddleware';

const router = express.Router();

router.get('/', cacheMiddleware('15 minutes'), cv_templateController.getAll);
router.get('/:id', cv_templateController.getOne);

export default router;
