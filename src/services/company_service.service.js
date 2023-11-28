import moment from 'moment/moment';
import dotenv from 'dotenv';
import createError from 'http-errors';
import { company_service, service } from '../models';
import { findByPkAndUpdate, findByPkAndDelete } from '../helpers/databaseHelpers';

dotenv.config();
const companyServiceService = {
	async getAll(req) {
		const queries = {};
		if (req.company_id) {
			queries.company_id = req.company_id;
		}
		return await company_service.findAll({
			where: queries,
			include: [
				{
					model: service
				}
			]
		});
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
			const register_date = moment(date).format('YYYY-MM-DD');
			const expiration_date = moment(register_date).add(30, 'days').format('YYYY-MM-DD');
			return await company_service.create({
				user_account_id,
				company_id,
				service_id,
				register_date,
				expiration_date
			});
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
	},
	async analysis(company_id) {
		const countCompanyService = await company_service.count({
			where: {
				company_id
			}
		});
		if (!countCompanyService) {
			throw createError(404, 'Không tìm thấy bản ghi');
		}
		return countCompanyService;
	}
};

export default companyServiceService;
