import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import orderItemService from '../services/orderItem.service';

const orderItemController = {
	async getAll(req, res) {
		const { query } = req;
		const [data, pagination] = await orderItemService.getAll(query);

		return res.apiResponse(data, pagination);
	},
	async create(req, res) {
		const data = req.body;
		const handleCreate = await orderItemService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await orderItemService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await orderItemService.getOne(id);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await orderItemService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(orderItemController);
