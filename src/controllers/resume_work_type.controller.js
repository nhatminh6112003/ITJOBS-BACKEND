import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import resumeWorkTypeService from '../services/resume_work_type.service';

const resumeWorkTypeController = {
	async getOne(req, res) {
		const { id } = req.params;
		const data = await resumeWorkTypeService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await resumeWorkTypeService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await resumeWorkTypeService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await resumeWorkTypeService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(resumeWorkTypeController);
