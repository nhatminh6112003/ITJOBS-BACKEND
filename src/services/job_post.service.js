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
import { findByPkAndUpdate, findOneAndUpdate, handlePaginate } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';
import createError from 'http-errors';
import { Sequelize } from 'sequelize';
import DateTypeEnum from '@src/constants/dateTypeEnum';
import jobPostStatusEnum from '@src/constants/jobPostStatusEnum';

const { Op } = Sequelize;
dotenv.config();
const jobPostService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};

		if (keyword) {
			queryCondition.job_title = {
				[Op.substring]: query.keyword
			};
		}

		if (query.dateType && query.fromDate && query.toDate) {
			const { dateType, fromDate, toDate } = query;

			if (dateType == DateTypeEnum.PostDate) {
				queryCondition.posted_date = { [Op.between]: [fromDate, toDate] };
			}

			if (dateType == DateTypeEnum.ExpiredDate) {
				queryCondition.expiry_date = { [Op.between]: [fromDate, toDate] };
			}
			
			if(dateType == DateTypeEnum.CreatedAt){
				queryCondition.createdAt = { [Op.between]: [fromDate, toDate] };
			}
		}

		if (query.user_account_id) {
			const { user_account_id } = query;
			queryCondition.posted_by_id = { [Op.eq]: user_account_id };
		}

		if (query.isDeleted) {
			const { isDeleted } = query;
			queryCondition.isDeleted = { [Op.eq]: isDeleted };
		}

		if (query.status) {
			const { status } = query;
			queryCondition.status = { [Op.eq]: status };
		}

		const [data, pagination] = await handlePaginate({
			model: job_post,
			page,
			limit,
			condition: queryCondition,
			queries: {
				raw: true,
				nest: true,
				include: [{ model: company }]
			}
		});
		return [data, pagination];
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
		Promise.all(
			job_welfare_id.map(async (id) => job_welfare_detail.create({ job_id: createJobPost.id, job_welfare_id: id }))
		);
		Promise.all(
			job_work_type_id.map(async (id) => job_work_type_detail.create({ job_id: createJobPost.id, work_type_id: id }))
		);

		Promise.all(
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
	},

	async analytic() {
		const pendingStatus = await job_post.count({ where: { status: { [Op.eq]: jobPostStatusEnum.Pending } } });
		const expiredStatus = await job_post.count({ where: { status: { [Op.eq]: jobPostStatusEnum.Expired } } });
		const publishStatus = await job_post.count({ where: { status: { [Op.eq]: jobPostStatusEnum.Publish } } });
		const pauseStatus = await job_post.count({ where: { status: { [Op.eq]: jobPostStatusEnum.Pause } } });
		return {pendingStatus , expiredStatus , pauseStatus, publishStatus}
	}
};

export default jobPostService;
