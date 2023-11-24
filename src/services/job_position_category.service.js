import createError from 'http-errors';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { job_position_category } from '../models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '../helpers/databaseHelpers';

const { Op } = Sequelize;
dotenv.config();
const jobPositionCategoryService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};
		
		if (keyword) {
			queryCondition.name = { [Op.substring]: keyword };
		}

		const [data, pagination] = await handlePaginate({
			model: job_position_category,
			page,
			limit,
			condition: queryCondition
		});
		return [data, pagination];
	},

	async getOne(id) {
		const findResume = await job_position_category.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},

	async create(data) {
		return await job_position_category.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(job_position_category, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(job_position_category, id);
	}
};

export default jobPositionCategoryService;
