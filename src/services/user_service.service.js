import { user_service } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';
import createError from 'http-errors';

dotenv.config();
const userServiceService = {
	async getAll() {
		return await user_service.findAll();
	},

	async getOne(id) {
		const dataOne = await user_service.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!dataOne) {
			throw createError(404, 'không tìm thấy');
		}
		return dataOne;
	},

	async create(data) {
		return await user_service.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(user_service, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(user_service, id);
	}
};

export default userServiceService;
