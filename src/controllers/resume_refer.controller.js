import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import resumeReferService from '@src/services/resume_refer.service';

const resumeReferController = {
	async getOne(req, res) {
		const { id } = req.params;
		const data = await resumeReferService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await resumeReferService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await resumeReferService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await resumeReferService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(resumeReferController);
