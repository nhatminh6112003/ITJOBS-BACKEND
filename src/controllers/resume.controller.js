import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import resumeService from '../services/resume.service';

const ResumeController = {
	async getAll(req, res) {
		const { query } = req;
		const [data, pagination] = await resumeService.getAll(query);
		return res.apiResponse(data, pagination);
	},
	async updateResumeStatus(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdateStatus = await resumeService.update(id, data);
		return res.apiResponse(handleUpdateStatus);
	},
	async create(req, res) {
		const data = req.body;
		const handleCreate = await resumeService.create(data);
		return res.apiResponse(handleCreate);
	},
	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await resumeService.update(id, data);
		return res.apiResponse(handleUpdate);
	},
	async getOne(req, res) {
		const { id } = req.params;
		const data = await resumeService.getOne(id);
		return res.apiResponse(data);
	},
	async delete(req, res) {
		const { id } = req.params;
		await resumeService.delete(id);
		return res.apiResponse();
	}
};
export default asyncHandlerDecorator(ResumeController);
