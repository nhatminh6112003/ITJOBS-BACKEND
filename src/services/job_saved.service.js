import createError from 'http-errors';
import dotenv from 'dotenv';
import { job_saved, user_account, job_post, company } from '../models';
import { findByPkAndUpdate, findByPkAndDelete } from '../helpers/databaseHelpers';

dotenv.config();
const jobSavedService = {
	async getAll(user_account_id) {
		const findSaved = await job_saved.findAll({
			where: {
				user_account_id
			},
			include: [
				{ model: user_account, as: 'user_account' },
				{ model: job_post, include: { model: company }, as: 'job_post_saved' }
			]
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
		const findResume = await job_saved.findOne({
			where: {
				user_account_id: data.user_account_id,
				job_id: data.job_id
			},
			raw: true
		});

		if (findResume) throw createError(409, 'Bạn đã lưu việc làm này');

		return await job_saved.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(job_saved, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(job_saved, id);
	},
	async analysis(user_account_id) {
		const countJobSaved = await job_saved.count({
			where: {
				user_account_id
			}
		});
		if (!countJobSaved) {
			throw createError(404, 'Không tìm thấy bản ghi');
		}
		return countJobSaved;
	}
};

export default jobSavedService;
