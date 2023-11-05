import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import benefitsService from '@src/services/benefits.service';

const benefitsController = {
	async getAll(req, res) {
		const { query } = req;
		const [data, pagination] = await benefitsService.getAll(query);

		return res.apiResponse(data, pagination);
	},
	async create(req, res) {
		const data = req.body;
		const handleCreate = await benefitsService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await benefitsService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await benefitsService.getOne(id);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await benefitsService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(benefitsController);
