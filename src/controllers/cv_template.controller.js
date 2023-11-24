import asyncHandlerDecorator from "../helpers/asyncHandlerDecorator";
import cvTemplateService from "../services/cv_template.service";

const cvTemplateController = {

    async getAll (req , res) {
        const data = await cvTemplateService.getAll()
        return res.apiResponse(data)
    }, 
    async getOne (req , res) {
        const {id} = req.params;
        const getOneTemplate = await cvTemplateService.getOne(id);
        return res.apiResponse(getOneTemplate)
    }
}

export default asyncHandlerDecorator(cvTemplateController)