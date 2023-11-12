import {
	employer_resume,
	my_attach,
	profession,
	resume_desired_job,
	resume_title,
	user_account,
	resume
} from '@src/models';
import createError from 'http-errors';

import { findByPkAndDelete, findByPkAndUpdate, handlePaginate } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

const { Op } = Sequelize;
dotenv.config();
const employer_resumeService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};

		if (keyword) {
			queryCondition.name = { [Op.substring]: keyword };
		}

		const [data, pagination] = await handlePaginate({
			model: employer_resume,
			page,
			limit,
			condition: queryCondition,
			queries: {
				nest: true,
				include: { model: resume, include: [
					{
						model: resume_title,
						as: 'resume_title'
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
				]}
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
