import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import resumeEducationService from '../services/resume_education.service';

const resumeEducationController = {
	async getAll(req, res) {
		const { id } = req.params;
		const data = await resumeEducationService.getAllByResume(id);
		return res.apiResponse(data);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await resumeEducationService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await resumeEducationService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await resumeEducationService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await resumeEducationService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(resumeEducationController);
