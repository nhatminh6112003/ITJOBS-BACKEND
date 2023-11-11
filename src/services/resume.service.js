import {
	resume,
	profession,
	resume_title,
	resume_profile,
	user_account,
	profession_desired_job,
	resume_desired_job,
	resume_work_type,
	work_type,
	welfare_desired_job,
	job_welfare,
	my_attach
} from '@src/models';
import createError from 'http-errors';
import { findByPkAndUpdate, handlePaginate, findOneAndUpdate } from '@src/helpers/databaseHelpers';
import { Sequelize } from 'sequelize';
import { resumeActiveEnum } from '@src/constants/resumeStatus';

const { Op } = Sequelize;

const resumeService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};
		const queryProfessionCondition = {};
		const queryResumeProfileCondition = {};
		const queryResumeTitleCondition = {};

		if (keyword) {
			queryResumeTitleCondition.title = { [Op.substring]: keyword };
		}
		if (query.user_account_id) {
			const { user_account_id } = query;
			queryCondition.user_account_id = { [Op.eq]: user_account_id };
		}
		if (query.isDeleted) {
			const { isDeleted } = query;
			queryCondition.isDeleted = { [Op.eq]: isDeleted };
		}
		if (query.resume_type_id) {
			const { resume_type_id } = query;
			queryCondition.resume_type_id = { [Op.eq]: resume_type_id };
		}

		// tìm theo ngành nghề
		if (query.profession_id) {
			const { profession_id } = query;
			queryProfessionCondition.id = { [Op.eq]: profession_id };
		}

		// tìm theo tỉnh thành
		if (query.provinces) {
			queryResumeProfileCondition.provinces = { [Op.eq]: query.provinces };
		}
		// tìm theo trạng thái hồ sơ

		if (query.resume_active == resumeActiveEnum.FLASH || query.resume_active == resumeActiveEnum.PUBLIC) {
			queryCondition.resume_active = { [Op.eq]: query.resume_active };
		}

		const [data, pagination] = await handlePaginate({
			model: resume,
			page,
			limit,
			condition: queryCondition,
			queries: {
				nest: true,
				include: [
					{
						model: resume_title,
						as: 'resume_title',
						where: Object.keys(queryResumeTitleCondition).length > 0 ? queryResumeTitleCondition : null
					},
					{
						model: profession,
						where: Object.keys(queryProfessionCondition).length > 0 ? queryProfessionCondition : null
					},
					{
						model: resume_desired_job,
						as: 'resume_desired_job'
					},
					{
						model: user_account,
						as: 'user_account',
						include: {
							model: resume_profile,
							where: Object.keys(queryResumeProfileCondition).length > 0 ? queryResumeProfileCondition : null
						}
					},
					{ model: my_attach, as: 'attachments' }
				]
			}
		});
		return [data, pagination];
	},
	// async getAllByResumeId
	async getOne(id) {
		const findResume = await resume.findOne({
			where: {
				id
			},

			nest: true,
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		const { resume_type_id } = findResume;
		const professionDesired = await profession_desired_job.findAll({
			where: {
				resume_id: id
			},
			include: { model: profession, as: 'profession' }
		});
		const resumeWorkType = await resume_work_type.findAll({
			where: {
				resume_id: id
			},
			include: { model: work_type, as: 'work_type' }
		});

		const welfareDesiredJob = await welfare_desired_job.findAll({
			where: {
				resume_id: id
			},
			include: { model: job_welfare, as: 'job_welfare' }
		});

		if (resume_type_id == 2) {
			// resume_type_id == 2 đính kèm file
			const findResumeByType = await resume.findOne({
				where: {
					id
				},
				include: [
					{ model: resume_title, as: 'resume_title' },
					{
						model: user_account,
						as: 'user_account',
						include: { model: resume_profile }
					},
					{ model: resume_desired_job, as: 'resume_desired_job' },
					{ model: my_attach, as: 'attachments' }
				],
				nest: true,
				raw: true
			});
			return {
				...findResumeByType,
				profession_desired_job: professionDesired,
				resume_work_type: resumeWorkType,
				welfare_desired_job: welfareDesiredJob
			};
		}

		return findResume;
	},
	async create(data) {
		return resume.create(data);
	},
	async update(id, data) {
		return await findByPkAndUpdate(resume, id, data);
	},
	async delete(id) {
		return await findOneAndUpdate(resume, { id }, { isDeleted: true });
	}
};

export default resumeService;
