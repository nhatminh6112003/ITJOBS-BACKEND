import resumeCertificateController from '../controllers/resume_certificate.controller';
import ResumeValidation from '../validations/resume.validation';
import Express from 'express';

const router = Express.Router();
router.get('/getAll/:id', resumeCertificateController.getAll);
router.get('/:id', resumeCertificateController.getOne);
router.post('', ResumeValidation.resume_certificate, resumeCertificateController.create);
router.patch('/:id', ResumeValidation.resume_certificate, resumeCertificateController.update);
router.delete('/:id', resumeCertificateController.delete);

export default router;
