import { job_post } from '@src/models';
import { findByPkAndUpdate, findOneAndUpdate } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';
import createError from 'http-errors';

dotenv.config();
const jobPostService = {
	async getAll() {
		return await job_post.findAll();
	},

	async getOne(id) {
		const dataOne = await job_post.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!dataOne) {
			throw createError(404, 'không tìm thấy bài đăng');
		}
		return dataOne;
	},

	async create(data) {
		return await job_post.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(job_post, id, data);
	},

	async delete(id) {
		return await findOneAndUpdate(job_post, { id }, { isDeleted: true });
	}
};

export default jobPostService;
