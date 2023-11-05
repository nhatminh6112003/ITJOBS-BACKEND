import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import price_listService from '@src/services/price_list.service';

const price_listController = {
	async getAll(req, res) {
		const { query } = req;
		const [data, pagination] = await price_listService.getAll(query);

		return res.apiResponse(data, pagination);
	},
	async create(req, res) {
		const data = req.body;
		const handleCreate = await price_listService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await price_listService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await price_listService.getOne(id);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await price_listService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(price_listController);
