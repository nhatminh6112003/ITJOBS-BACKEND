import asyncHandlerDecorator from "@src/helpers/asyncHandlerDecorator";
import resumeLanguageService from "@src/services/resume_language.service";

const resumeLanguageController = {
    async create(req, res) {
        const data = req.body;
        await resumeLanguageService.create(data)
        return res.apiResponse(data)
    },

    async update (req, res) {
        const data = req.body;
        const {id} = req.params;
        await resumeLanguageService.update(id , data)
        return res.apiResponse(data)
    },


    async getOne(req, res) {
        const {id} = req.params;
        const data = await resumeLanguageService.getOne(id)
        return res.apiResponse(data)
    },

    async delete (req, res) {
        const {id} = req.params;
        await resumeLanguageService.delete(id)
        return res.apiResponse()
    }

}

export default asyncHandlerDecorator(resumeLanguageController);