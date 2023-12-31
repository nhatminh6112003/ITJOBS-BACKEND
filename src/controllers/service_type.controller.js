import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import serviceTypeService from '../services/service_type.service';

const serviceTypeController = {
	async getAll(req, res) {
		const { query } = req;
		const [data, pagination] = await serviceTypeService.getAll(query);
		return res.apiResponse(data, pagination);
	},
	async getOne(req, res) {
		const { id } = req.params;
		const data = await serviceTypeService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await serviceTypeService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const { id } = req.params;
		const data = req.body;
		const handleUpdate = await serviceTypeService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await serviceTypeService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(serviceTypeController);
