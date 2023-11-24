import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import resumeCertificateService from '../services/resume_certificate.service';

const resumeCertificateController = {
	async getAll(req, res) {
		const { id } = req.params;
		const data = await resumeCertificateService.getAllByResume(id);
		return res.apiResponse(data);
	},
	async getOne(req, res) {
		const { id } = req.params;
		const data = await resumeCertificateService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await resumeCertificateService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await resumeCertificateService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await resumeCertificateService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(resumeCertificateController);
