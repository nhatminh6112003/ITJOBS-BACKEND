import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import jobWelfareService from '@src/services/job_welfare.service';

const jobPositionCategoryController = {
	async getAll(req, res) {
		const { query } = req;
		const [data, pagination] = await jobWelfareService.getAll(query);

		return res.apiResponse(data,pagination);
	},
	async create(req, res) {
		const data = req.body;
		const handleCreate = await jobWelfareService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await jobWelfareService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await jobWelfareService.getOne(id);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await jobWelfareService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(jobPositionCategoryController);