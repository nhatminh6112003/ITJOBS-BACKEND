import createError from 'http-errors';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { profession, job_position_category, job_post } from '../models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '../helpers/databaseHelpers';
import jobPostStatusEnum from '../constants/jobPostStatusEnum';

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
		const professionList = await job_post.findAll({
			where: {
				status: jobPostStatusEnum.Publish
			},
			include: [
				{
					model: profession,
					as: 'profession',
					include: [
						{
							model: job_position_category,
							as: 'job_position_category'
						}
					]
				}
			],
			nest: true
		});

		const result = {};

		professionList.forEach((job) => {
			job.profession.forEach((professionItem) => {
				const categoryName = professionItem.job_position_category.name;
				const professionId = professionItem.id;
				const professionName = professionItem.name;

				if (!result[categoryName]) {
					result[categoryName] = {
						job_position_category_name: categoryName,
						profession_data: []
					};
				}

				const existingProfession = result[categoryName].profession_data.find(
					(p) => p.profession_id === professionId
				);
				if (existingProfession) {
					// eslint-disable-next-line no-plusplus
					existingProfession.count++;
				} else {
					result[categoryName].profession_data.push({
						profession_id: professionId,
						profession_name: professionName,
						count: 1
					});
				}
			});
		});

		const formattedData = Object.values(result);
		return formattedData;
	}
};

export default professionService;
