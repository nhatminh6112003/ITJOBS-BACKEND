import { job_post_activity } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';
import createError from 'http-errors';

dotenv.config();
const jobPostActivityService = {
	async getAll() {
		return await job_post_activity.findAll();
	},

	async getOne(id) {
		const dataOne = await job_post_activity.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!dataOne) {
			throw createError(404, 'không tìm thấy bài viết đăng tuyển dụng');
		}
		return dataOne;
	},

	async create(data) {
		return await job_post_activity.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(job_post_activity, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(job_post_activity, id);
	}
};

export default jobPostActivityService;
