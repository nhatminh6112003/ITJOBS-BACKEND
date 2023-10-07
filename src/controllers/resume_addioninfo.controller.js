import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import resumeAddioninfoService from '@src/services/resume_addioninfo.service';

const resumeAddioninfoController = {
	async getAll(req, res) {
		const { id } = req.params;
		const data = await resumeAddioninfoService.getAllByResume(id);
		return res.apiResponse(data);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await resumeAddioninfoService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await resumeAddioninfoService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await resumeAddioninfoService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await resumeAddioninfoService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(resumeAddioninfoController);