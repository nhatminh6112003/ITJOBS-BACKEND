import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import resumeCertificateService from '@src/services/resume_certificate.service';

const resumeCertificateController = {
	async getOne(req, res) {
		const { id } = req.params;
		const data = await resumeCertificateService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		await resumeCertificateService.create(data);
		return res.apiResponse(data);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		await resumeCertificateService.update(id, data);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await resumeCertificateService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(resumeCertificateController);
