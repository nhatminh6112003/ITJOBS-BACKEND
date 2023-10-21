import { job_post, job_welfare_detail, job_work_type_detail, job_profession_detail } from '@src/models';
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
			include: [
				{ model: job_welfare_detail, as: 'job_welfare_detail' },
				{ model: job_profession_detail, as: 'job_profession_detail' },
				{ model: job_work_type_detail, as: 'job_work_type_detail' },
			],
			nest: true,
			raw: true
		});
		if (!dataOne) {
			throw createError(404, 'không tìm thấy bài đăng');
		}
		return dataOne;
	},

	async create({ job_welfare_id, job_work_type_id, job_profession_id, ...data }) {
		const createJobPost = await job_post.create(data);
		const createJobWelfareDetail = Promise.all(
			job_welfare_id.map(async (id) => job_welfare_detail.create({ job_id: createJobPost.id, job_welfare_id: id }))
		);
		const createJobWorkTypeDetail = Promise.all(
			job_work_type_id.map(async (id) =>
				job_work_type_detail.create({ job_id: createJobPost.id, work_type_id: id })
			)
		);

		const createJobProfessionDetail = Promise.all(
			job_profession_id.map(async (id) =>
				job_profession_detail.create({ job_id: createJobPost.id, profession_id: id })
			)
		);

		return createJobPost;
	},

	async update(id, data) {
		return await findByPkAndUpdate(job_post, id, data);
	},

	async delete(id) {
		return await findOneAndUpdate(job_post, { id }, { isDeleted: true });
	}
};

export default jobPostService;
