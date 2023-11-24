import { company } from '../models';
import { findByPkAndUpdate, findByPkAndDelete} from '../helpers/databaseHelpers';
import dotenv from 'dotenv';
import createError from "http-errors";

dotenv.config();
const companyService = {
    async getAll() {
		return await company.findAll();
	},
    
    async getOne(id) {
		const dataOne= await company.findOne({
            where:{
                id
            },
            raw: true
        });
        if(!dataOne){
            throw createError(404,"không tìm thấy thông tin công ty")
        }
        return dataOne
	},

	async create(data) {
		return await company.create(data);
	},

	async update(id, data) {
		console.log("TCL: update -> data", data)
		return await findByPkAndUpdate(company, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(company, id);
	}
};

export default companyService;