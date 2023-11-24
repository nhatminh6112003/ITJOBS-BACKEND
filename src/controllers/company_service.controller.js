import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import company_serviceService from '../services/company_service.service';

const companyServiceController = {
	async getAll(req, res) {
		const data = await company_serviceService.getAll();
		return res.apiResponse(data);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await company_serviceService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await company_serviceService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await company_serviceService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await company_serviceService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(companyServiceController);
