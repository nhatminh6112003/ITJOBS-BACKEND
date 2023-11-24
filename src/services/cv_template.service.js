import createError from "http-errors";
import {cv_template} from "../models";



const cvTemplateService = {
    async getAll() {
        return await cv_template.findAll();
    },

    async getOne (id) {
        const dataOne = await cv_template.findOne({
            where:{id},
            raw:true
        })
        if(!dataOne) throw createError(404,'Không tìm thấy thông tin template')
        return dataOne
    }
}

export default cvTemplateService