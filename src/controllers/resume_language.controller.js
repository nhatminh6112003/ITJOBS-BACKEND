import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import resumeLanguageService from '../services/resume_language.service';

const resumeLanguageController = {
	async getAll(req, res) {
		const { id } = req.params;
		const data = await resumeLanguageService.getAllByResume(id);
		return res.apiResponse(data);
	},
	async create(req, res) {
		const data = req.body;
		const handleCreate = await resumeLanguageService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await resumeLanguageService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await resumeLanguageService.getOne(id);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await resumeLanguageService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(resumeLanguageController);
