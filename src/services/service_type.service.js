import dotenv from 'dotenv';
import slugify from 'slugify';
import createError from 'http-errors';
import { Sequelize } from 'sequelize';
import { service_type } from '../models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '../helpers/databaseHelpers';

const { Op } = Sequelize;

dotenv.config();
const serviceTypeService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};
		if (keyword) {
			queryCondition.name = { [Op.substring]: keyword };
		}
		const [data, pagination] = await handlePaginate({
			model: service_type,
			page,
			limit,
			condition: queryCondition
		});
		return [data, pagination];
	},

	async getOne(id) {
		const dataOne = await service_type.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!dataOne) {
			throw createError(404, 'không tìm thấy thông tin ');
		}
		return dataOne;
	},

	async create(data) {
		const slug = slugify(data.name, {
			lower: true
		});
		return await service_type.create({
			...data,
			slug
		});
	},

	async update(id, data) {
		const slug = slugify(data.name, {
			lower: true
		});
		return await findByPkAndUpdate(service_type, id, {
			...data,
			slug
		});
	},

	async delete(id) {
		return await findByPkAndDelete(service_type, id);
	}
};

export default serviceTypeService;
