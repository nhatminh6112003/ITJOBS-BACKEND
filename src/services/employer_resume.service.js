import createError from 'http-errors';

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { resumeActiveEnum } from '../constants/resumeStatus';
import { findByPkAndDelete, findByPkAndUpdate, handlePaginate } from '../helpers/databaseHelpers';
import {
	employer_resume,
	my_attach,
	profession,
	resume_desired_job,
	resume_title,
	user_account,
	resume
} from '../models';

const { Op } = Sequelize;
dotenv.config();
const employer_resumeService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};
		const queryConditionResume = {};
		const queryConditionResumeTitle = {};


		
		if (keyword) {
			queryConditionResumeTitle.title = {
				[Op.substring]: query.keyword
			};
		}
		
		if (query.user_account_id) {
			const { user_account_id } = query;
			queryCondition.user_account_id = { [Op.eq]: user_account_id };
		}
		if (keyword) {
			queryCondition.name = { [Op.substring]: keyword };
		}

		if (query.resume_active == resumeActiveEnum.FLASH || query.resume_active == resumeActiveEnum.PUBLIC) {
			queryConditionResume.resume_active = { [Op.eq]: query.resume_active };
		}

		if (query.fromDate && query.toDate) {
			const { fromDate, toDate } = query;
			queryCondition.createdAt = { [Op.between]: [fromDate, toDate] };
		}

		const [data, pagination] = await handlePaginate({
			model: employer_resume,
			page,
			limit,
			condition: queryCondition,
			queries: {
				nest: true,
				include: {
					model: resume,
					where: Object.keys(queryConditionResume).length > 0 ? queryConditionResume : null,
					include: [
						{
							model: resume_title,
							as: 'resume_title',
							where: Object.keys(queryConditionResumeTitle).length > 0 ? queryConditionResumeTitle : null,
						},
						{
							model: profession
						},
						{
							model: resume_desired_job,
							as: 'resume_desired_job'
						},
						{
							model: user_account,
							as: 'user_account'
						},
						{ model: my_attach, as: 'attachments' }
					]
				}
			}
		});
		return [data, pagination];
	},

	async getOne(id) {
		const findResume = await employer_resume.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},

	async create(data) {
		const findResume = await employer_resume.findOne({
			where: {
				user_account_id: data.user_account_id,
				resume_id: data.resume_id
			},
			raw: true
		});

		if (findResume) throw createError(409, 'Bạn đã lưu hồ sơ này');

		return await employer_resume.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(employer_resume, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(employer_resume, id);
	}
};

export default employer_resumeService;
