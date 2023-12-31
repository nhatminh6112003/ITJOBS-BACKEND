import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import resumeSkillService from '../services/resume_skill.service';

const resumeSkillController = {
	async getAll(req, res) {
		const { id } = req.params;
		const data = await resumeSkillService.getAllByResume(id);
		return res.apiResponse(data);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await resumeSkillService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await resumeSkillService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await resumeSkillService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await resumeSkillService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(resumeSkillController);
