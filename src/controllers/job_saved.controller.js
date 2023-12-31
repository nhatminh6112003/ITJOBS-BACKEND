import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import jobSavedService from '../services/job_saved.service';

const jobSavedlController = {
	async getAll(req, res) {
		const { id } = req.params;
		const data = await jobSavedService.getAll(id);
		return res.apiResponse(data);
	},
	async create(req, res) {
		const data = req.body;
		const handleCreate = await jobSavedService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await jobSavedService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await jobSavedService.getOne(id);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await jobSavedService.delete(id);
		return res.apiResponse();
	},
	async analysis(req, res) {
		const { id } = req.params;
		console.log(id);
		const data = await jobSavedService.analysis(id);
		return res.apiResponse(data);
	}
};

export default asyncHandlerDecorator(jobSavedlController);
