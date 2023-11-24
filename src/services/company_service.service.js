import dotenv from 'dotenv';
import createError from 'http-errors';
import { company_service } from '../models';
import { findByPkAndUpdate, findByPkAndDelete } from '../helpers/databaseHelpers';
import moment from 'moment/moment';

dotenv.config();
const companyServiceService = {
	async getAll() {
		return await company_service.findAll();
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
		const date = new Date();
		const { user_account_id, company_id, service_id } = data;
		const dataOne = await company_service.findOne({
			where: {
				user_account_id,
				company_id,
				service_id
			},
			raw: true
		});
		if (!dataOne) {
			const register_date = moment(date).format('YYYYMMDD');
			const expiration_date = moment(register_date, 'YYYYMMDD').add(30, 'days').format('YYYYMMDD');
			return await company_service.create({ user_account_id, company_id, service_id, register_date, expiration_date });
		}
		const { expiration_date, id } = dataOne;
		const newExiration_date = moment(expiration_date, 'YYYYMMDD').add(30, 'days').format('YYYYMMDD');
		return await findByPkAndUpdate(company_service, id, { expiration_date: newExiration_date });
	},

	async update(id, data) {
		return await findByPkAndUpdate(company_service, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(company_service, id);
	}
};

export default companyServiceService;
