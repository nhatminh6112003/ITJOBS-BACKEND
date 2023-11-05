import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import userServiceService from '@src/services/user_service.service';

const userServiceController = {
	async getAll(req, res) {
		const data = await userServiceService.getAll();
		return res.apiResponse(data);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await userServiceService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await userServiceService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await userServiceService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await userServiceService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(userServiceController);
