import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import resumeExperienceService from '../services/resume_experience.service';

const resumeExperienceController = {
	async getAll(req, res) {
		const { id } = req.params;
		const data = await resumeExperienceService.getAllByResume(id);
		return res.apiResponse(data);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await resumeExperienceService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await resumeExperienceService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await resumeExperienceService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await resumeExperienceService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(resumeExperienceController);
