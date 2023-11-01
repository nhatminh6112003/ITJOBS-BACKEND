import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import jobPostActivityService from '@src/services/job_post_activity.service';

const jobPostActivityController = {
	async getAll(req, res) {
		const { query } = req;
		const [data,pagination] = await jobPostActivityService.getAll(query);
		return res.apiResponse(data,pagination);
	},
	async getOne(req, res) {
		const { id } = req.params;
		const data = await jobPostActivityService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await jobPostActivityService.create(data);
		return res.apiResponse(handleCreate);
	},
	async sendMailJobSeeker(req, res) {
		const data = req.body;
		 await jobPostActivityService.sendMailJobSeeker(data);
		return res.apiResponse();
	},
	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await jobPostActivityService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async updateStatusResume(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await jobPostActivityService.updateStatusResume(id, data);
		return res.apiResponse(handleUpdate);
	},
	
	
	async delete(req, res) {
		const { id } = req.params;
		await jobPostActivityService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(jobPostActivityController);
