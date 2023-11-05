import createError from 'http-errors';
import { price_list } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

const { Op } = Sequelize;
dotenv.config();
const price_listService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};
		
		if (keyword) {
			queryCondition.name = { [Op.substring]: keyword };
		}

		const [data, pagination] = await handlePaginate({
			model:price_list,
			page,
			limit,
			condition: queryCondition
		});
		return [data, pagination];
	},

	async getOne(id) {
		const findResume = await price_list.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},

	async create(data) {
		return await price_list.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(price_list, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(price_list, id);
	}
};

export default price_listService;
