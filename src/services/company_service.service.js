import moment from 'moment/moment';
import dotenv from 'dotenv';
import createError from 'http-errors';
import { Sequelize, company_service, service, service_type } from '../models';
import { findByPkAndUpdate, findByPkAndDelete } from '../helpers/databaseHelpers';

dotenv.config();
const companyServiceService = {
	async getAll(req) {
		const queries = {};
		if (req.company_id) {
			queries.company_id = req.company_id;
		}
		if (req.isExpiry || req.isExpiry !== 0) {
			queries.isExpiry = req.isExpiry;
		}
		return await company_service.findAll({
			where: queries,
			include: [
				{
					model: service,
					include: [{ model: service_type }]
				}
			]
		});
	},

	async getAllByService() {
		return await company_service.findAll({
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
			const quantity = 1;
			const isActive = false;
			return await company_service.create({
				user_account_id,
				company_id,
				service_id,
				quantity,
				isActive
			});
		}
		const { quantity, id } = dataOne;
		const newQuantity = quantity + 1;
		return await findByPkAndUpdate(company_service, id, { quantity: newQuantity });
	},

	async update(id, data) {
		return await findByPkAndUpdate(company_service, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(company_service, id);
	},

	async analysis(company_id) {
		const nowDay = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
		const results = await company_service.findAll({
			where: {
				company_id,
				expiration_date: {
					[Sequelize.Op.gte]: nowDay
				}
			},
			raw: true
		});
		console.log(results);
		if (!results) {
			throw createError(404, 'Không tìm thấy bản ghi');
		}
		return results;
	}
};

export default companyServiceService;
