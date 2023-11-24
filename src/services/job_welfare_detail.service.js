import createError from 'http-errors';
import dotenv from 'dotenv';
import { job_welfare_detail } from '../models';
import { findByPkAndUpdate, findByPkAndDelete } from '../helpers/databaseHelpers';

dotenv.config();
const jobWelfareDetailService = {
	async getAll(job_id) {
		const findJobWelfareDetail = await job_welfare_detail.findAll({
			where: {
				job_id
			},
			raw: true
		});
		if (!findJobWelfareDetail) throw createError(404, 'Không tìm thấy bản ghi');
		return findJobWelfareDetail;
	},

	async getOne(id) {
		const findJobWelfareDetail = await job_welfare_detail.findOne({
			where: {
				id,
			},
			raw: true
		});
		if (!findJobWelfareDetail) throw createError(404, 'Không tìm thấy bản ghi');
		return findJobWelfareDetail;
	},

	async create(data) {
		return await job_welfare_detail.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(job_welfare_detail, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(job_welfare_detail, id);
	}
};

export default jobWelfareDetailService;
