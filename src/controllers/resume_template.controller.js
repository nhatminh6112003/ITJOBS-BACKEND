import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';

import resumeTemplateService from '@src/services/resume_template.service';

const resumeTemplate = {
	async getOne(req,res){
		const { resume_id } = req.params;
		const data = await resumeTemplateService.getOne(resume_id)
		return res.apiResponse(data);
	},
	async changeTemplate(req, res) {
		const { resume_id } = req.params;
      const data=req.body
		const handleUpdate = await resumeTemplateService.changeTemplate(resume_id,data)
		return res.apiResponse(handleUpdate);
	},
	async updateUI(req,res){
		const { resume_id } = req.params;
      const data=req.body
		const handleUpdate = await resumeTemplateService.updateUiCv(resume_id,data)
		return res.apiResponse(handleUpdate);
	}
};

export default asyncHandlerDecorator(resumeTemplate);
