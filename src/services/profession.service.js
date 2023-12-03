import createError from 'http-errors';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { profession, job_position_category } from '../models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '../helpers/databaseHelpers';

const { Op } = Sequelize;
dotenv.config();
const professionService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};

		if (keyword) {
			queryCondition.name = { [Op.substring]: keyword };
		}

		const [data, pagination] = await handlePaginate({
			model: profession,
			page,
			limit,
			condition: queryCondition,
			queries: {
				raw: true,
				nest: true,
				include: { model: job_position_category, as: 'job_position_category' }
			}
		});
		return [data, pagination];
	},

	async getOne(id) {
		const findResume = await profession.findOne({
			where: {
				id
			},
			include: { model: job_position_category, as: 'job_position_category' },
			nest: true,
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},

	async create(data) {
		return await profession.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(profession, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(profession, id);
	},

	async analysisProfession() {
		const professionList = await profession.findAll({
			attributes: [
				[Sequelize.fn('COUNT', Sequelize.col('profession.id')), 'count'],
				[Sequelize.literal('job_position_category.name'), 'job_position_category_name'],
				[Sequelize.literal('profession.id'), 'profession_id'], // Thêm id của profession
				[Sequelize.literal('profession.name'), 'profession_name']
			],
			include: [
				{
					model: job_position_category,
					as: 'job_position_category',
					attributes: ['id', 'name']
				}
			],
			group: ['job_position_category.id', 'job_position_category.name', 'profession_id', 'profession_name'],
			raw: true
		});

		if (!professionList) {
			throw createError(404, 'Không tìm thấy bản ghi');
		}

		const dataMap = new Map();

		professionList.forEach((item) => {
			const jobPositionCategoryName = item.job_position_category_name;
			const professionId = item.profession_id; // Lấy id của profession
			const professionName = item.profession_name;
			const { count } = item;

			if (!dataMap.has(jobPositionCategoryName)) {
				dataMap.set(jobPositionCategoryName, {
					job_position_category_name: jobPositionCategoryName,
					profession_data: []
				});
			}

			dataMap.get(jobPositionCategoryName).profession_data.push({
				profession_id: professionId,
				profession_name: professionName,
				count
			});
		});

		const data = Array.from(dataMap.values());

		return data;
	}
};

export default professionService;
