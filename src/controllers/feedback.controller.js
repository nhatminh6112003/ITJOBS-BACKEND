import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import feedbackService from '@src/services/feedback.service';

const feedbackController = {
	async getAll(req, res) {
		const { query } = req;
		const [data, pagination] = await feedbackService.getAll(query);

		return res.apiResponse(data, pagination);
	},
	async create(req, res) {
		const data = req.body;
		const handleCreate = await feedbackService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await feedbackService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await feedbackService.getOne(id);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await feedbackService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(feedbackController);
