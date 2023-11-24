import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import professionService from '../services/profession.service';

const professionController = {
	async getAll(req, res) {
		const { query } = req;
		const [data, pagination] = await professionService.getAll(query);

		return res.apiResponse(data, pagination);
	},
	async create(req, res) {
		const data = req.body;
		const handleCreate = await professionService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await professionService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await professionService.getOne(id);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await professionService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(professionController);
