import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import resumeObjectiveService from '@src/services/resume_objective.service';

const resumeObjectiveController = {
	async create(req, res) {
		const data = req.body;
		const handleCreate = await resumeObjectiveService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await resumeObjectiveService.update(id, data);
		return res.apiResponse(handleUpdate);
	},
	async getAll(req, res) {
		const { id } = req.params;
		const data = await resumeObjectiveService.getAllByResume(id);
		return res.apiResponse(data);
	},
	async getOne(req, res) {
		const { id } = req.params;
		const data = await resumeObjectiveService.getOne(id);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await resumeObjectiveService.delete(id);
		return res.apiResponse();
	}

};

export default asyncHandlerDecorator(resumeObjectiveController);