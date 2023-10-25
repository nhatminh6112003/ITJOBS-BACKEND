import {
	job_post,
	job_welfare_detail,
	job_welfare,
	job_work_type_detail,
	job_profession_detail,
	profession,
	work_type,
	company
} from '@src/models';
import { findByPkAndUpdate, findOneAndUpdate } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';
import createError from 'http-errors';

dotenv.config();
const jobPostService = {
	async getAll() {
		return await job_post.findAll({
			include: { model: company },
		});
	},

	async getOne(id) {
		const dataJobPost = await job_post.findOne({
			where: {
				id
			},
			include: { model: company },
			nest: true,
			raw: true
		});
		const [jobWelfare, jobProfessionDetail, jobWorkTypeDetail] = await Promise.all([
			job_welfare_detail.findAll({
				where: {
					job_id: dataJobPost.id
				},
				include: [{ model: job_welfare }],
				nest: true,
				raw: true
			}),
			job_profession_detail.findAll({
				where: {
					job_id: dataJobPost.id
				},
				include: [{ model: profession }],
				nest: true,
				raw: true
			}),
			job_work_type_detail.findAll({
				where: {
					job_id: dataJobPost.id
				},
				include: [{ model: work_type }],
				nest: true,
				raw: true
			})
		]);

		if (!dataJobPost) {
			throw createError(404, 'không tìm thấy bài đăng');
		}
		return { ...dataJobPost, jobWelfare, jobProfessionDetail, jobWorkTypeDetail };
	},

	async create({ job_welfare_id, job_work_type_id, job_profession_id, ...data }) {
		const createJobPost = await job_post.create(data);
		const createJobWelfareDetail = Promise.all(
			job_welfare_id.map(async (id) => job_welfare_detail.create({ job_id: createJobPost.id, job_welfare_id: id }))
		);
		const createJobWorkTypeDetail = Promise.all(
			job_work_type_id.map(async (id) => job_work_type_detail.create({ job_id: createJobPost.id, work_type_id: id }))
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
