import createError from 'http-errors';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { order, company } from '../models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '../helpers/databaseHelpers';

const { Op } = Sequelize;
dotenv.config();
const orderService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};

		if (keyword) {
			queryCondition.name = { [Op.substring]: keyword };
		}

		const [data, pagination] = await handlePaginate({
			model: order,
			page,
			limit,
			condition: queryCondition,
			queries: {
				nest: true,
				include: {
					model: company
				}
			}
		});
		return [data, pagination];
	},

	async getOne(id) {
		const findResume = await order.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},

	async create(data) {
		return await order.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(order, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(order, id);
	},

	async analysis() {
		const count = await order.count();
		if (!count) {
			throw createError(404, 'Không tìm thấy bản ghi');
		}
		return count;
	}
};

export default orderService;
