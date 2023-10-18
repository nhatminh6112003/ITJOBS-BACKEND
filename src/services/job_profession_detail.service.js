import createError from 'http-errors';
import { job_profession_detail } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';


dotenv.config();
const jobProfessionDetailService = {
	async getAll(job_id){
		const findProfessionDetail = await job_profession_detail.findAll({
			where: {
				job_id
			},
			raw: true
		});
		if (!findProfessionDetail) throw createError(404, 'Không tìm thấy bản ghi');
		return findProfessionDetail;
	},

	async getOne(id) {
		const findResume = await job_profession_detail.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},

	async create(data) {
		return await job_profession_detail.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(job_profession_detail, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(job_profession_detail, id);
	}
};

export default jobProfessionDetailService;