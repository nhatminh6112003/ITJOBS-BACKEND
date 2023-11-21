import express from 'express';
import cv_templateController from '@src/controllers/cv_template.controller';
import cacheMiddleware from '@src/middleware/cacheMiddleware';

const router = express.Router();

router.get('/', cacheMiddleware('15 minutes'), cv_templateController.getAll);
router.get('/:id', cv_templateController.getOne);

export default router;
