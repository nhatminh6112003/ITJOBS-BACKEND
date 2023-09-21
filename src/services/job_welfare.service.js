import createError from 'http-errors';
import { job_welfare } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';

dotenv.config();
const jobWelfareService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';

		const [data, pagination] =await handlePaginate({ model: job_welfare, page, keyword, limit });
		return [data,pagination]
	},

	async getOne(id) {
		const findResume = await job_welfare.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},

	async create(data) {
		return await job_welfare.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(job_welfare, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(job_welfare, id);
	}
};

export default jobWelfareService;