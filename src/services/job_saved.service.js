import createError from 'http-errors';
import { job_saved } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';


dotenv.config();
const jobSavedService = {
	async getAll(user_account_id){
		const findSaved = await job_saved.findAll({
			where: {
				user_account_id
			},
			raw: true
		});
		if (!findSaved) throw createError(404, 'Không tìm thấy bản ghi');
		return findSaved;
	},

	async getOne(id) {
		const findSaved = await job_saved.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!findSaved) throw createError(404, 'Không tìm thấy bản ghi');
		return findSaved;
	},

	async create(data) {
		return await job_saved.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(job_saved, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(job_saved, id);
	}
};

export default jobSavedService;