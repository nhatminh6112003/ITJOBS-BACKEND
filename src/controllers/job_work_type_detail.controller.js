import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import jobWorkTypeDetailService from '../services/job_work_type_detail.service';

const jobWorkTypeDetailController = {
	async getAll(req, res) {
		const data = await jobWorkTypeDetailService.getAll();
		return res.apiResponse(data);
	},
	async getOne(req, res) {
		const { id } = req.params;
		const data = await jobWorkTypeDetailService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await jobWorkTypeDetailService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await jobWorkTypeDetailService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await jobWorkTypeDetailService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(jobWorkTypeDetailController);
