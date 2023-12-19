import dotenv from 'dotenv';
import createError from 'http-errors';
import moment from 'moment';
import { Sequelize } from 'sequelize';
import DateTypeEnum from '../constants/dateTypeEnum';
import jobPostStatusEnum from '../constants/jobPostStatusEnum';
import { findByPkAndUpdate, findOneAndUpdate, handlePaginate } from '../helpers/databaseHelpers';
import {
	job_post,
	job_welfare_detail,
	job_welfare,
	job_work_type_detail,
	job_profession_detail,
	profession,
	work_type,
	company,
	sequelize,
	job_post_activity,
	company_service
} from '../models';

const { Op } = Sequelize;
dotenv.config();
const jobPostService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};
		const queryProfessionCondition = {};

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

			if (dateType == DateTypeEnum.CreatedAt) {
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

		if (query.company_id) {
			const { company_id } = query;
			queryCondition.company_id = { [Op.eq]: company_id };
		}

		if (query.status) {
			const { status } = query;
			queryCondition.status = { [Op.eq]: Number(status) };
		}

		if (query.stringStatus) {
			const { stringStatus } = query;
			const arrayStatus = stringStatus.toString().split(',');
			queryCondition.status = { [Op.in]: arrayStatus };
		}

		if (query.profession_id) {
			const { profession_id } = query;
			queryProfessionCondition.id = { [Op.eq]: profession_id };
		}
		// salary
		if (query.salary) {
			const { salary } = query;
			queryCondition.min_salary = { [Op.gte]: salary };
		}

		// TỈnh thành phố
		if (query.provinces) {
			queryCondition.provinces = { [Op.eq]: query.provinces };
		}
		if (query.job_position_value) {
			queryCondition.job_position_value = { [Op.eq]: query.job_position_value };
		}
		const currentDate = new Date();
		const threeDaysAgo = new Date(currentDate);
		threeDaysAgo.setDate(currentDate.getDate() - 3);

		const sevenDaysAgo = new Date(currentDate);
		sevenDaysAgo.setDate(currentDate.getDate() - 7);

		const fourTeenDaysAgo = new Date(currentDate);
		sevenDaysAgo.setDate(currentDate.getDate() - 14);

		const thirtyDaysAgo = new Date(currentDate);
		sevenDaysAgo.setDate(currentDate.getDate() - 30);

		if (query.days) {
			if (query.days === 3) {
				queryCondition.posted_date = { [Op.gt]: threeDaysAgo };
			} else if (query.days === 7) {
				queryCondition.posted_date = { [Op.gt]: sevenDaysAgo };
			} else if (query.days === 14) {
				queryCondition.posted_date = { [Op.gt]: fourTeenDaysAgo };
			} else if (query.days === 30) {
				queryCondition.posted_date = { [Op.gt]: thirtyDaysAgo };
			}
		}

		const [data, pagination] = await handlePaginate({
			model: job_post,
			page,
			limit,
			condition: queryCondition,
			queries: {
				nest: true,
				include: [
					{ model: company },
					{
						model: profession,
						as: 'profession',
						where: Object.keys(queryProfessionCondition).length > 0 ? queryProfessionCondition : null
					},
					{ model: company_service }
				]
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

	async analytic(query) {
		const { posted_by_id } = query;
		const pendingStatus = await job_post.findAll({
			where: { status: { [Op.eq]: jobPostStatusEnum.Pending }, posted_by_id, isDeleted: false }
		});

		const expiredStatus = await job_post.count({
			where: {
				status: { [Op.eq]: jobPostStatusEnum.Expired },
				posted_by_id
			}
		});
		const publishStatus = await job_post.count({
			where: { status: { [Op.eq]: jobPostStatusEnum.Publish }, posted_by_id }
		});
		const pauseStatus = await job_post.count({
			where: { status: { [Op.eq]: jobPostStatusEnum.Pause }, posted_by_id }
		});
		return { pendingStatus: pendingStatus.length, expiredStatus, pauseStatus, publishStatus };
	},

	async calculateCorrelationIndex(query) {
		const { startDate, endDate, user_account_id } = query;
		const results = await job_post.findAll({
			attributes: [
				[sequelize.fn('DATE_FORMAT', sequelize.col('posted_date'), '%d/%m'), 'day'],
				[sequelize.literal('COUNT(*)'), 'total_jobs']
			],
			where: {
				posted_by_id: user_account_id
			},
			group: ['day'],
			nest: true,
			raw: true
		});

		const resultJobPostActivity = await job_post_activity.findAll({
			attributes: [
				[sequelize.fn('DATE_FORMAT', sequelize.col('apply_date'), '%d/%m'), 'day'],
				[sequelize.literal('COUNT(*)'), 'total_resume']
			],
			include: [
				{
					model: job_post,
					where: {
						posted_by_id: user_account_id
					}
				}
			],
			group: ['day', 'job_post.id'],
			nest: true,
			raw: true
		});

		const daysBetween = this.calculateDaysDifference(startDate, endDate);

		const data_1 = Array(daysBetween).fill(0);
		const data_2 = Array(daysBetween).fill(0);

		const label = [];

		const currentDate = new Date(startDate);
		while (currentDate <= new Date(endDate)) {
			const formattedDate = `${moment(currentDate).format('DD')}/${currentDate.getMonth() + 1}`;
			label.push(formattedDate);
			currentDate.setDate(currentDate.getDate() + 1);
		}

		results.forEach((result) => {
			const dayIndex = label.indexOf(result.day);
			if (dayIndex !== -1) {
				data_1[dayIndex] = result.total_jobs;
			}
		});

		resultJobPostActivity.forEach((result) => {
			const { day } = result;
			const totalResume = result.total_resume;
			const dayIndex = label.indexOf(day);
			data_2[dayIndex] = totalResume;
		});

		return {
			data_1,
			data_2,
			label,
			title_1: 'Việc làm',
			title_2: 'Ứng tuyển'
		};
	},
	async analyticJobSeekerApplyByDay(query) {
		const { startDate, endDate, user_account_id } = query;

		const daysBetween = this.calculateDaysDifference(startDate, endDate);
		const results = await job_post_activity.findAll({
			attributes: [
				[sequelize.fn('DATE_FORMAT', sequelize.col('apply_date'), '%d/%m'), 'day'],
				[sequelize.literal('COUNT(*)'), 'total_resume']
			],
			include: [
				{
					model: job_post,
					where: {
						posted_by_id: user_account_id
					}
				}
			],
			group: ['day', 'job_post.id']
		});
		const data_1 = Array(daysBetween).fill(0);
		const label = [];

		const currentDate = new Date(startDate);
		while (currentDate <= new Date(endDate)) {
			const formattedDate = `${moment(currentDate).format('DD')}/${currentDate.getMonth() + 1}`;
			label.push(formattedDate);
			currentDate.setDate(currentDate.getDate() + 1);
		}
		results.forEach((result) => {
			const { day } = result.dataValues;
			const totalResume = result.dataValues.total_resume;
			const dayIndex = label.indexOf(day);
			data_1[dayIndex] = totalResume;
		});
		return {
			data_1,
			label
		};
	},

	async analyticResumeStatus(query) {
		const { startDate, endDate, user_account_id } = query;

		const ResumeStatusEnum = {
			UNDECIDED: 0, // Chưa quyết định
			NOT_MATCHED: 1, // Không phù hợp
			REJECTED: 2, // Từ chối
			UNDER_REVIEW: 3, // Kiểm tra
			INTERVIEW: 4, // Phỏng vấn
			OFFERED: 5, // Đề nghị tuyển dụng
			HIRED: 6 // Nhận việc
		};
		const ResumeStatusOptions = [
			{ label: 'Chưa quyết định', value: ResumeStatusEnum.UNDECIDED },
			{ label: 'Không phù hợp', value: ResumeStatusEnum.NOT_MATCHED },
			{ label: 'Từ chối', value: ResumeStatusEnum.REJECTED },
			{ label: 'Kiểm tra', value: ResumeStatusEnum.UNDER_REVIEW },
			{ label: 'Phỏng vấn', value: ResumeStatusEnum.INTERVIEW },
			{ label: 'Đề nghị tuyển dụng', value: ResumeStatusEnum.OFFERED },
			{ label: 'Nhận việc', value: ResumeStatusEnum.HIRED }
		];

		const getStatusCount = async (status) => {
			const queryStatusCount = `
			  SELECT COUNT(*) AS count
			  FROM job_post_activity
			  JOIN job_post ON job_post_activity.job_id = job_post.id
			  WHERE DATE(job_post_activity.apply_date) BETWEEN :startDate AND :endDate
				 AND job_post_activity.status = :status
				 AND job_post.posted_by_id = :userAccountId
			`;

			const [result] = await sequelize.query(queryStatusCount, {
				replacements: {
					startDate: moment(startDate).format('YYYY-MM-DD'),
					endDate: moment(endDate).format('YYYY-MM-DD'),
					status,
					userAccountId: user_account_id
				},
				type: sequelize.QueryTypes.SELECT
			});

			return result.count;
		};
		const statusCounts = [];

		await Promise.all(
			Object.values(ResumeStatusEnum).map(async (status) => {
				const count = await getStatusCount(status);
				statusCounts.push(count);
			})
		);

		return {
			data_1: statusCounts,
			label: ResumeStatusOptions.map((item) => item.label)
		};
	},

	async analyticDegreeValue(query) {
		const { startDate, endDate, user_account_id } = query;

		const DegreeOptions = [
			{ label: 'Chưa tốt nghiệp', value: 0 },
			{ label: 'Trung học', value: 1 },
			{ label: 'Trung cấp', value: 2 },
			{ label: 'Cao đẳng', value: 3 },
			{ label: 'Đại học', value: 4 },
			{ label: 'Sau đại học', value: 5 },
			{ label: 'Khác', value: 6 }
		];
		const DegreeEnum = {
			CHUA_TOT_NGHIEP: 0, // Chưa tốt nghiệp
			TRUNG_HOC: 1, // Trung học
			TRUNG_CAP: 2, // Trung cấp
			CAO_DANG: 3, // Cao đẳng
			DAI_HOC: 4, // Đại học
			SAU_DAI_HOC: 5, // Sau đại học
			KHAC: 6 // Khác
		};
		const getDegreeCount = async (degree) => {
			const queryStatusCount = `
			  SELECT COUNT(*) AS count
			  FROM job_post
			  WHERE DATE(job_post.posted_date) BETWEEN :startDate AND :endDate
				 AND job_post.posted_by_id = :userAccountId
				 AND job_post.job_degree_value = :job_degree_value 
				 AND job_post.status =:status 
			`;

			const [result] = await sequelize.query(queryStatusCount, {
				replacements: {
					startDate: moment(startDate).format('YYYY-MM-DD'),
					endDate: moment(endDate).format('YYYY-MM-DD'),
					job_degree_value: degree,
					userAccountId: user_account_id,
					status: jobPostStatusEnum.Publish
				},
				type: sequelize.QueryTypes.SELECT
			});

			return result.count;
		};
		const statusCounts = [];

		await Promise.all(
			Object.values(DegreeEnum).map(async (degree) => {
				const count = await getDegreeCount(degree);
				console.log('TCL: analyticDegreeValue -> count', count);
				statusCounts.push(count);
			})
		);
		return {
			data_1: statusCounts,
			label: DegreeOptions.map((item) => item.label)
		};
	},

	async analyticTotalPost() {
		const countPost = await job_post.findAll({
			where: { isDeleted: false, status: { [Op.eq]: jobPostStatusEnum.Publish } },
			raw: true
		});
		return countPost;
	},
	calculateDaysDifference(start_date, end_date) {
		const startDateObj = new Date(start_date);
		const endDateObj = new Date(end_date);

		const timeDifference = endDateObj - startDateObj;
		const daysDifference = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));

		return daysDifference + 1;
	}
};

export default jobPostService;
