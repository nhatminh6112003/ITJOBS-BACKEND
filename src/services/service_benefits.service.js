import createError from 'http-errors';
import { service_benefits } from '../models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '../helpers/databaseHelpers';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

const { Op } = Sequelize;
dotenv.config();
const service_benefitsService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};
		
		if (keyword) {
			queryCondition.name = { [Op.substring]: keyword };
		}

		const [data, pagination] = await handlePaginate({
			model:service_benefits,
			page,
			limit,
			condition: queryCondition
		});
		return [data, pagination];
	},

	async getOne(id) {
		const findResume = await service_benefits.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},

	async create(data) {
		return await service_benefits.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(service_benefits, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(service_benefits, id);
	}
};

export default service_benefitsService;
