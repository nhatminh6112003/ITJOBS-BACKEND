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
		const company_service = await company_serviceService.getAllByService();
		
		const sortedArray = company_service.sort((a, b) => {
			if (!a.priority && !b.priority) {
				// Nếu cả hai đều có priority: false, đưa xuống cuối mảng
				return 0;
			} else if (!a.priority) {
				// Nếu chỉ a có priority: false, đưa xuống cuối mảng
				return 1;
			} else if (!b.priority) {
				// Nếu chỉ b có priority: false, đưa xuống cuối mảng
				return -1;
			} else {
				// Nếu cả hai đều có priority: true, áp dụng các điều kiện khác
				if (a.priority_level % 3 === b.priority_level % 3) {
					return moment(b.priority_expiry_date).diff(moment(a.priority_expiry_date));
				} else {
					return (a.priority_level % 3) - (b.priority_level % 3);
				}
			}
		});

		data.sort((x, y) => {
			return (
				sortedArray.findIndex((item) => item.user_account_id === x.posted_by_id) -
				sortedArray.findIndex((item) => item.user_account_id === y.posted_by_id)
			);
		});

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
