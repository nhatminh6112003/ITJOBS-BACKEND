import { company_service, company } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';
import createError from 'http-errors';
import { Sequelize } from 'sequelize';

const { Op } = Sequelize;

dotenv.config();
const companyServiceService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};
		const queryConditionOther = {};

		// if (u) {
		// 	queryCondition.name = { [Op.substring]: keyword };
		// }

		const [data, pagination] = await handlePaginate({
			model: company_service,
			page,
			limit,
			// condition: queryCondition
			queries: {
				nest: true,
				include: [{ model: company, where: queryConditionOther, include: { model: company } }]
			}
		});
		return [data, pagination];
	},

	async getOne(id) {
		const dataOne = await company_service.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!dataOne) {
			throw createError(404, 'Không tìm thấy thông tin công ty');
		}
		return dataOne;
	},

	async create(data) {
		return await company_service.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(company_service, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(company_service, id);
	}
};

export default companyServiceService;
