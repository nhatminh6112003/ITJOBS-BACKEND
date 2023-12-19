import moment from 'moment/moment';
import dotenv from 'dotenv';
import createError from 'http-errors';
import { Sequelize } from 'sequelize';
import { company_service, service, service_type } from '../models';
import { findByPkAndUpdate, findByPkAndDelete, findOneAndUpdate } from '../helpers/databaseHelpers';

const { Op } = Sequelize;
dotenv.config();
const companyServiceService = {
	async getAll(req) {
		const queries = {};
		if (req.company_id) {
			queries.company_id = req.company_id;
		}

		if (req.isActive || req.isActive === 0) {
			queries.isActive = req.isActive;
		}

		if (req.isExpiry || req.isExpiry === 0) {
			queries.isExpiry = req.isExpiry;
		}

		if (req.fromDate && req.toDate) {
			const { fromDate, toDate } = req;
			queries.register_date = { [Op.between]: [fromDate, toDate] };
		}

		return await company_service.findAll({
			where: queries,
			include: [
				{
					model: service,
					include: [
						{
							model: service_type
						}
					]
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
		console.log(3, id);
		const dataOne = await company_service.findOne({
			where: {
				id
			},
			raw: true,
			nest: true
		});
		if (!dataOne) {
			throw createError(404, 'Không tìm thấy thông tin công ty');
		}
		return dataOne;
	},

	async create(data) {
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

	async updateByIsActive(service_type_id,posted_by_id) {
		const data = await company_service.findAll({
			where: {
				isActive: true,
				user_account_id: posted_by_id
				
			},
			include: [
				{
					model: service
				}
			],
			raw: true,
			nest: true
		});
		const result = data.find(item => item.service.service_type_id === service_type_id);
		if(!result) {
			return;
		}
		return await findByPkAndUpdate(company_service, result.id, { isActive: false });
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
				},
				isActive:true
			},
			raw: true
		});
		if (!results) {
			throw createError(404, 'Không tìm thấy bản ghi');
		}
		return results;
	}
};

export default companyServiceService;
