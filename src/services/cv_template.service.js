import {cv_template} from "@src/models";
import createError from "http-errors";



const cvTemplateService = {
    async getAll() {
        return await cv_template.findAll();
    },

    async getOne (id) {
        const dataOne = await cv_template.findOne({
            where:{id},
            raw:true
        })
        if(!dataOne) throw createError(400,'không tìm thấy thông tin template')
        return dataOne
    }
}

export default cvTemplateService