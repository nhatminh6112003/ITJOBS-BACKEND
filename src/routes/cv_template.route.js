import express from "express";
import cv_templateController from "@src/controllers/cv_template.controller";

const router = express.Router();

router.get('/', cv_templateController.getAll);
router.get('/:id', cv_templateController.getOne)

export default router