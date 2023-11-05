import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import serviceService from '@src/services/service.service';

const serviceController = {
	async getAll(req, res) {
		const { id } = req.params;
		const data = await serviceService.getAll(id);
		return res.apiResponse(data);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await serviceService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await serviceService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await serviceService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await serviceService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(serviceController);
