import createError from 'http-errors';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { profession, job_position_category } from '../models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '../helpers/databaseHelpers';

const { Op } = Sequelize;
dotenv.config();
const professionService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};

		if (keyword) {
			queryCondition.name = { [Op.substring]: keyword };
		}
		
		const [data, pagination] = await handlePaginate({
			model: profession,
			page,
			limit,
			condition: queryCondition,
			queries: {
				raw: true,
				nest: true,
				include: { model: job_position_category, as: 'job_position_category' }
			}
		});
		return [data, pagination];
	},

	async getOne(id) {
		const findResume = await profession.findOne({
			where: {
				id
			},
			include: { model: job_position_category, as: 'job_position_category' },
			nest: true,
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},

	async create(data) {
		return await profession.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(profession, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(profession, id);
	}
};

export default professionService;
