import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import {{controllerName}}Service from '@src/services/{{controllerName}}.service';

const {{controllerName}}Controller = {
	async getAll(req, res) {
		const { query } = req;
		const [data, pagination] = await {{controllerName}}Service.getAll(query);

		return res.apiResponse(data, pagination);
	},
	async create(req, res) {
		const data = req.body;
		const handleCreate = await {{controllerName}}Service.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await {{controllerName}}Service.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await {{controllerName}}Service.getOne(id);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await {{controllerName}}Service.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator({{controllerName}}Controller);
