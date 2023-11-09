import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import employer_resumeService from '@src/services/employer_resume.service';

const employer_resumeController = {
	async getAll(req, res) {
		const { query } = req;
		const [data, pagination] = await employer_resumeService.getAll(query);

		return res.apiResponse(data, pagination);
	},
	async create(req, res) {
		const data = req.body;
		const handleCreate = await employer_resumeService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await employer_resumeService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await employer_resumeService.getOne(id);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await employer_resumeService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(employer_resumeController);
