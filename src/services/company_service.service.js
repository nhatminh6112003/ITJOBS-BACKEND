import dotenv from 'dotenv';
import createError from "http-errors";
import { company_service } from '../models';
import { findByPkAndUpdate, findByPkAndDelete} from '../helpers/databaseHelpers';

dotenv.config();
const companyServiceService = {
    async getAll() {
		return await company_service.findAll();
	},
    
    async getOne(id) {
		const dataOne= await company_service.findOne({
            where:{
                id
            },
            raw: true
        });
        if(!dataOne){
            throw createError(404,"Không tìm thấy thông tin công ty")
        }
        return dataOne
	},

	async create(data) {
		return await company_service.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(company_service, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(company_service, id);
	}
};

export default companyServiceService;