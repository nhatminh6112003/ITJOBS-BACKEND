import dotenv from 'dotenv';
import createError from 'http-errors';
import { Sequelize } from 'sequelize';
import { company, user_account } from '../models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '../helpers/databaseHelpers';

dotenv.config();
const { Op } = Sequelize;

const companyService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};

		if (keyword) {
			queryCondition.name = { [Op.substring]: keyword };
		}

		const [data, pagination] = await handlePaginate({
			model: company,
			page,
			limit,
			condition: queryCondition
		});
		return [data, pagination];
	},

	async getOne(id) {
		const dataOne = await company.findOne({
			where: {
				id
			},
			include: [{ model: user_account, as: 'user_account' }]
		});
		if (!dataOne) {
			throw createError(404, 'không tìm thấy thông tin công ty');
		}
		return dataOne;
	},

	async create(data) {
		return await company.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(company, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(company, id);
	}
};

export default companyService;
