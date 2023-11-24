import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import resumeDesiredJobService from '../services/resume_desired_job.service';

const resumeDesiredJob = {
	async getOne(req, res) {
		const { id } = req.params;
		const data = await resumeDesiredJobService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await resumeDesiredJobService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const { resume_id } = req.params;
		const data = req.body;
		const handleUpdate = await resumeDesiredJobService.update(resume_id,data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await resumeDesiredJobService.delete(id);
		return res.apiResponse();
	}
};

export default asyncHandlerDecorator(resumeDesiredJob);
