import dotenv from 'dotenv';
import createError from 'http-errors';
import { Sequelize } from 'sequelize';
import { findByPkAndDelete, findByPkAndUpdate, handlePaginate } from '../helpers/databaseHelpers';
import { company, order, sequelize } from '../models';

const { Op } = Sequelize;
dotenv.config();
const orderService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};

		if (keyword) {
			queryCondition.name = { [Op.substring]: keyword };
		}

		const [data, pagination] = await handlePaginate({
			model: order,
			page,
			limit,
			condition: queryCondition,
			queries: {
				nest: true,
				include: {
					model: company
				}
			}
		});
		return [data, pagination];
	},

	async getOne(id) {
		const findResume = await order.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},

	async create(data) {
		return await order.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(order, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(order, id);
	},

	async analysis() {
		const count = await order.count();
		if (!count) {
			throw createError(404, 'Không tìm thấy bản ghi');
		}
		return count;
	},
	// async calculateTotalRevenue(query) {
	// 	const { startDate, endDate } = query;
	// 	const daysBetween = this.calculateDaysDifference(startDate, endDate);
	// 	const results = await order.findAll({
	// 		attributes: [
	// 			[sequelize.fn('SUM', sequelize.col('total')), 'total_revenue'],
	// 			[sequelize.fn('DATE_FORMAT', sequelize.col('order.createdAt'), '%d/%m'), 'day']
	// 		],
	// 		where: {
	// 			createdAt: {
	// 				[Sequelize.Op.between]: [
	// 					moment(startDate).format('YYYY-MM-DD h:mm:ss'),
	// 					moment(endDate).format('YYYY-MM-DD h:mm:ss')
	// 				]
	// 			}
	// 		},
	// 		group: ['day'],
	// 		raw: true
	// 	});

	// 	const label = [];
	// 	console.log(results);
	// 	const currentDate = new Date(startDate);
	// 	while (currentDate <= new Date(endDate)) {
	// 		const formattedDate = `${moment(currentDate).format('DD')}/${currentDate.getMonth() + 1}`;
	// 		label.push(formattedDate);
	// 		currentDate.setDate(currentDate.getDate() + 1);
	// 	}
	// 	const data = Array(daysBetween).fill(0);

	// 	results.forEach((result) => {
	// 		const dayIndex = label.indexOf(result.day);
	// 		data[dayIndex] = Number(result.total_revenue);
	// 	});

	// 	return {
	// 		data,
	// 		label
	// 	};
	// },
	async calculateTotalRevenue(query) {
		const results = await order.findAll({
			attributes: [
				[sequelize.fn('SUM', sequelize.col('total')), 'total_revenue'],
				[sequelize.fn('MONTH', sequelize.col('order.createdAt')), 'month']
			],
			where: sequelize.where(
				sequelize.fn('YEAR', sequelize.col('order.createdAt')),
				query.year ? query.year : new Date().getFullYear()
			),
			group: ['month'],
			raw: true
		});

		const data = Array(12).fill(0);
		const labels = Array.from({ length: 12 }, (v, i) => {
			const monthNumber = i + 1;
			const monthString = parseInt(monthNumber, 10).toString();
			return `Tháng ${monthString}`;
		});

		results.forEach((result) => {
			const monthIndex = labels.findIndex((label) => label.endsWith(result.month.toString()));
			if (monthIndex !== -1) {
				data[monthIndex] = Number(result.total_revenue);
			}
		});

		return {
			data,
			labels
		};
	}
};

export default orderService;
