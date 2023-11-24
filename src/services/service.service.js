import createError from 'http-errors';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { service, service_type, benefits } from '../models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '../helpers/databaseHelpers';

const { Op } = Sequelize;

dotenv.config();

const serviceService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};

		if (keyword) {
			queryCondition.name = { [Op.substring]: keyword };
		}

		const [data, pagination] = await handlePaginate({
			model: service,
			page,
			limit,
			condition: queryCondition,
			queries: {
				nest: true,
				include: [{ model: service_type }, { model: benefits }]
			},
			nest: true
		});
		return [data, pagination];
	},

	async getOne(id) {
		const findResume = await service.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},

	async create(data) {
		return await service.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(service, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(service, id);
	},

	async getAllByServiceType(service_type_id) {
		const findService = await service.findAll({
			where: {
				service_type_id
			},
			raw: true
		});
		if (!findService) throw createError(404, 'Không tìm thấy bản ghi');
		return findService;
	}
};

export default serviceService;
