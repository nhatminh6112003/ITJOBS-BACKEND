import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import jobProfessionDetailService from '../services/job_profession_detail.service';

const jobProfessionDetailController = {
	async getAll(req, res) {
		const { id } = req.params;
		const data = await jobProfessionDetailService.getAll(id);
		return res.apiResponse(data);
	},
	async create(req, res) {
		const data = req.body;
		const handleCreate = await jobProfessionDetailService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await jobProfessionDetailService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await jobProfessionDetailService.getOne(id);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await jobProfessionDetailService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(jobProfessionDetailController);