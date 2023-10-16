import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import companyService from '@src/services/company.service';

const companyController = {
    async getAll(req , res) {
        const data = await companyService.getAll();
        return res.apiResponse(data)
    },
    async getOne(req , res) {
        const {id} = req.params
        const data = await companyService.getOne(id);
        return res.apiResponse(data)
    },

	async create(req, res) {
		const data = req.body;
		const handleCreate = await companyService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await companyService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await companyService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(companyController);
