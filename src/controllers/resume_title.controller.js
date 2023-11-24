import resumeTitleService from '../services/resume_title.service';
import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';

const ResumeTitleController = {
	async getOne(req, res) {
		const { resume_id } = req.params;
		const data = await resumeTitleService.getOne(resume_id);
		return res.apiResponse(data);
	},
	async update(req, res) {
		const data = req.body;
		const { resume_id } = req.params;
		const handleUpdate = await resumeTitleService.update(resume_id, data);
		return res.apiResponse(handleUpdate);
	}
};
export default asyncHandlerDecorator(ResumeTitleController);
