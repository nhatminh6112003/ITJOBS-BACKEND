import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import resumeProfileService from '@src/services/resume_profile.service';
const ResumeProfileController = {
	async update(req,res) {
		const data = req.body;
		const { resume_id } = req.params;
		const handleUpdate=await resumeProfileService.update(resume_id, data);
		return res.apiResponse(handleUpdate)
	}
};
export default asyncHandlerDecorator(ResumeProfileController);
