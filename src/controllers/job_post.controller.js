import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import jobPostService from '../services/job_post.service';

const jobPostController = {
	async getAll(req, res) {
		const { query } = req;
		const [data, pagination] = await jobPostService.getAll(query);
		return res.apiResponse(data, pagination);
	},
	async getOne(req, res) {
		const { id } = req.params;
		const data = await jobPostService.getOne(id);
		return res.apiResponse(data);
	},

	async analytic(req, res) {
		const data = await jobPostService.analytic(req.query);
		return res.apiResponse(data);
	},
	async calculateCorrelationIndex(req, res) {
		const { query } = req;
		const data = await jobPostService.calculateCorrelationIndex(query);
		return res.apiResponse(data);
	},
	async analyticJobSeekerApplyByDay(req, res) {
		const { query } = req;
		const data = await jobPostService.analyticJobSeekerApplyByDay(query);
		return res.apiResponse(data);
	},
	async analyticResumeStatus(req, res) {
		const { query } = req;
		const data = await jobPostService.analyticResumeStatus(query);
		return res.apiResponse(data);
	},
	async analyticDegreeValue(req, res) {
		const { query } = req;
		const data = await jobPostService.analyticDegreeValue(query);
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
