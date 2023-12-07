import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import jobPostService from '../services/job_post.service';
import company_serviceService from '../services/company_service.service';

const jobPostController = {
	async getAll(req, res) {
		const { query } = req;
		const [data, pagination] = await jobPostService.getAll(query);
		return res.apiResponse(data, pagination);
	},
	async getAllByService(req, res) {
		const { query } = req;
		const [data, pagination] = await jobPostService.getAll(query);
		const { data: company_service } = await company_serviceService.getAllByService();
		// sắp xếp theo giá tiền
		if (company_service) {
			data.sort((a, b) => {
				const priceA = company_service.find((item) => item.company_id === a.company_id)?.service?.price || 0;
				const priceB = company_service.find((item) => item.company_id === b.company_id)?.service?.price || 0;
				return priceB - priceA;
			});
		}

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
	},

	async analyticTotalPost(req, res) {
		const data = await jobPostService.analyticTotalPost();
		return res.apiResponse(data);
	}
};

export default asyncHandlerDecorator(jobPostController);
