import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import service_benefitsService from '../services/service_benefits.service';

const service_benefitsController = {
	async getAll(req, res) {
		const { query } = req;
		const [data, pagination] = await service_benefitsService.getAll(query);

		return res.apiResponse(data, pagination);
	},
	async create(req, res) {
		const data = req.body;
		const handleCreate = await service_benefitsService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await service_benefitsService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await service_benefitsService.getOne(id);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await service_benefitsService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(service_benefitsController);
