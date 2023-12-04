import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import orderService from '../services/order.service';

const orderController = {
	async getAll(req, res) {
		const { query } = req;
		const [data, pagination] = await orderService.getAll(query);

		return res.apiResponse(data, pagination);
	},
	async create(req, res) {
		const data = req.body;
		const handleCreate = await orderService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await orderService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await orderService.getOne(id);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await orderService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(orderController);
