import moment from 'moment/moment';
import dotenv from 'dotenv';
import createError from 'http-errors';
import { Sequelize, company_service, sequelize, service, service_type } from '../models';
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
	},

	async calculateTotalRevenue(query) {
		const { startDate, endDate } = query;
		const daysBetween = this.calculateDaysDifference(startDate, endDate);
		const results = await company_service.findAll({
			attributes: [
				[sequelize.fn('SUM', sequelize.col('service.price')), 'total_revenue'],
				[sequelize.col('service.name'), 'service_name'],
				[sequelize.fn('DATE_FORMAT', sequelize.col('company_service.createdAt'), '%d/%m'), 'day']
			],

			where: {
				createdAt: {
					[Sequelize.Op.between]: [
						moment(startDate).format('YYYY-MM-DD h:mm:ss'),
						moment(endDate).format('YYYY-MM-DD h:mm:ss')
					]
				}
			},

			include: [
				{
					model: service,
					attributes: []
				}
			],

			group: ['day', 'service.name'],
			raw: true
		});

		const label = [];

		const currentDate = new Date(startDate);
		while (currentDate <= new Date(endDate)) {
			const formattedDate = `${moment(currentDate).format('DD')}/${currentDate.getMonth() + 1}`;
			label.push(formattedDate);
			currentDate.setDate(currentDate.getDate() + 1);
		}
		const data = Array(daysBetween).fill(0);

		results.forEach((result) => {
			const dayIndex = label.indexOf(result.day);
			data[dayIndex] = Number(result.total_revenue);
		});

		return {
			data,
			label
		};
	},

	calculateDaysDifference(start_date, end_date) {
		const startDateObj = new Date(start_date);
		const endDateObj = new Date(end_date);

		const timeDifference = endDateObj - startDateObj;
		const daysDifference = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));

		return daysDifference + 1;
	}
};

export default companyServiceService;
