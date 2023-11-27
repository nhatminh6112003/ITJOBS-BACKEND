import dotenv from 'dotenv';
import createError from 'http-errors';
import { company, user_account } from '../models';
import { findByPkAndUpdate, findByPkAndDelete } from '../helpers/databaseHelpers';

dotenv.config();
const companyService = {
	async getAll() {
		return await company.findAll();
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
		if (data.lastname || data.firstname) {
			await findByPkAndUpdate(user_account, data.user_account_id, data);
		}
		return await findByPkAndUpdate(company, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(company, id);
	}
};

export default companyService;
