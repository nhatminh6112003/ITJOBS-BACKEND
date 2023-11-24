import createError from 'http-errors';
import { {{serviceName}} } from '../models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '../helpers/databaseHelpers';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

const { Op } = Sequelize;
dotenv.config();
const {{serviceName}}Service = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};
		
		if (keyword) {
			queryCondition.name = { [Op.substring]: keyword };
		}

		const [data, pagination] = await handlePaginate({
			model:{{serviceName}},
			page,
			limit,
			condition: queryCondition
		});
		return [data, pagination];
	},

	async getOne(id) {
		const findResume = await {{serviceName}}.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},

	async create(data) {
		return await {{serviceName}}.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate({{serviceName}}, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete({{serviceName}}, id);
	}
};

export default {{serviceName}}Service;
