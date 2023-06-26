import resumeTitleService from '@src/services/resume_title.service';
import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';

const ResumeTitleController = {
	async update(req,res,next) {
		const data = req.body;
		const { resume_id } = req.params;
		const handleUpdate=await resumeTitleService.update(resume_id, data);
		return res.apiResponse(handleUpdate)
	}
};
export default asyncHandlerDecorator(ResumeTitleController);
