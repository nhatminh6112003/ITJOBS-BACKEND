import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import companyService from '../services/company.service';

const companyController = {
	async getAll(req, res) {
		const data = await companyService.getAll();
		return res.apiResponse(data);
	},
	async getOne(req, res) {
		const { id } = req.params;
		const data = await companyService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await companyService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const logo=req.files[0]?.filename;
		const { id } = req.params;
		const banner=req.files[1]?.filename;
		const data = req.body;

		const dataUpdate= {
			...data,
			logo: logo || null,
			banner:banner || null,
		};
		if(!logo) delete dataUpdate.logo;
		if(!banner) delete dataUpdate.banner;
		const handleUpdate = await companyService.update(id,dataUpdate);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await companyService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(companyController);
