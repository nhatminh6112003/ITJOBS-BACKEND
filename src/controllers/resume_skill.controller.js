import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import resumeSkillService from '@src/services/resume_skill.service';

const resumeSkillController = {
	async getOne(req, res) {
		const { id } = req.params;
		const data = await resumeSkillService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		await resumeSkillService.create(data);
		return res.apiResponse(data);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		await resumeSkillService.update(id, data);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await resumeSkillService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(resumeSkillController);
