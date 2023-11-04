import { service_type } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete} from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';
import createError from "http-errors";

dotenv.config();
const serviceTypeService = {
    async getAll() {
		return await service_type.findAll();
	},
    
    async getOne(id) {
		const dataOne= await service_type.findOne({
            where:{
                id
            },
            raw: true
        });
        if(!dataOne){
            throw createError(404,"không tìm thấy thông tin ")
        }
        return dataOne
	},

	async create(data) {
		return await service_type.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(service_type, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(service_type, id);
	}
};

export default serviceTypeService;