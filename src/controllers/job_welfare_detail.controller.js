import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import jobWelfareDetailService from '@src/services/job_welfare_detail.service';

const jobWelfareDetailController = {
	async getAll(req, res) {
		const { id } = req.params;
		const data = await jobWelfareDetailService.getAll(id);
		return res.apiResponse(data);
	},
	async create(req, res) {
		const data = req.body;
		const handleCreate = await jobWelfareDetailService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await jobWelfareDetailService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await jobWelfareDetailService.getOne(id);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await jobWelfareDetailService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(jobWelfareDetailController);