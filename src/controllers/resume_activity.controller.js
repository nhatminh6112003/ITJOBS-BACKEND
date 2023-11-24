import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import resumeActivityService from '../services/resume_activity.service';

const resumeActivityController = {
	async getAll(req, res) {
		const { id } = req.params;
		const data = await resumeActivityService.getAllByResume(id);
		return res.apiResponse(data);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await resumeActivityService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await resumeActivityService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await resumeActivityService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await resumeActivityService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(resumeActivityController);
