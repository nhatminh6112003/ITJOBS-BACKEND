import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import jobPostService from '@src/services/job_post.service';

const jobPostController = {
	async getAll(req, res) {
		const data = await jobPostService.getAll();
		return res.apiResponse(data);
	},
	async getOne(req, res) {
		const { id } = req.params;
		const data = await jobPostService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await jobPostService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await jobPostService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await jobPostService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(jobPostController);
