import createError from 'http-errors';
import { profession } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

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
			query: queryCondition
		});
		return [data, pagination];
	},

	async getOne(id) {
		const findResume = await profession.findOne({
			where: {
				id
			},
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
