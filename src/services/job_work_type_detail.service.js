import { job_work_type_detail } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';
import createError from 'http-errors';

dotenv.config();
const jobWorkTypeDetailService = {
	async getAll() {
		return await job_work_type_detail.findAll();
	},

	async getOne(id) {
		const dataOne = await job_work_type_detail.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!dataOne) {
			throw createError(404, 'Không tìm thấy');
		}
		return dataOne;
	},

	async create(data) {
		return await job_work_type_detail.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(job_work_type_detail, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(job_work_type_detail, id);
	}
};

export default jobWorkTypeDetailService;
