import dotenv from 'dotenv';
import slugify from 'slugify';
import createError from 'http-errors';
import { service_type } from '../models';
import { findByPkAndUpdate, findByPkAndDelete } from '../helpers/databaseHelpers';

dotenv.config();
const serviceTypeService = {
	async getAll() {
		return await service_type.findAll();
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
