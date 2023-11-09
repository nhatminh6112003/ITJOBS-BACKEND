import createError from 'http-errors';
import { employer_resume } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '@src/helpers/databaseHelpers';
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
			model:employer_resume,
			page,
			limit,
			condition: queryCondition
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
