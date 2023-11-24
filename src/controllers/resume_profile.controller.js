import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import resumeProfileService from '../services/resume_profile.service';

const ResumeProfileController = {
	async update(req, res) {
		const data = req.body;
		const { user_id } = req.params;
		const handleUpdate = await resumeProfileService.update(user_id, data);
		return res.apiResponse(handleUpdate);
	},

	async getOne(req, res) {
		const { user_id } = req.params;
		const data = await resumeProfileService.getOne(user_id);
		return res.apiResponse(data);
	}
};
export default asyncHandlerDecorator(ResumeProfileController);
