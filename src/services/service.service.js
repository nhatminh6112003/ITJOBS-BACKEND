import slugify from 'slugify';
import createError from 'http-errors';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { service, service_type, service_benefits, benefits } from '../models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '../helpers/databaseHelpers';

const { Op } = Sequelize;

dotenv.config();

const serviceService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};

		if (keyword) {
			queryCondition.name = { [Op.substring]: keyword };
		}
		if (query.service_type_id) {
			queryCondition.service_type_id = query.service_type_id;
		}

		const [data, pagination] = await handlePaginate({
			model: service,
			page,
			limit,
			condition: queryCondition,
			queries: {
				nest: true,
				include: [{ model: service_type }, { model: benefits }]
			},
			nest: true
		});
		return [data, pagination];
	},

	async getOne(id) {
		const serviceDetail = await service.findOne({
			where: {
				id
			},
			raw: true
		});
		const serviceBenefits = await service_benefits.findAll({
			where: {
				service_id: serviceDetail.id
			},
			include: [{ model: benefits }],
			nest: true,
			raw: true
		});
		if (!serviceDetail) throw createError(404, 'Không tìm thấy bản ghi');
		return { ...serviceDetail, serviceBenefits };
	},

	async create(data) {
		const slug = slugify(data.name, {
			lower: true
		});
		const createService = await service.create({ ...data, slug });

		Promise.all(
			data.benefit_ids.map(async (id) => service_benefits.create({ benefit_id: id, service_id: createService.id }))
		);
		return createService;
	},

	async update(id, data) {
		const slug = slugify(data.name, {
			lower: true
		});
		const serviceDetail = await service_benefits.findAll({
			where: {
				service_id: id
			},
			raw: true
		});
		serviceDetail.forEach(async (item) => {
			await service_benefits.destroy({
				where: {
					service_id: item.service_id
				}
			});
		});
		Promise.all(data.benefit_ids.map(async (item) => service_benefits.create({ benefit_id: item, service_id: id })));
		return await findByPkAndUpdate(service, id, { ...data, slug });
	},

	async delete(id) {
		return await findByPkAndDelete(service, id);
	},

	async getAllByServiceType(service_type_id) {
		const findService = await service.findAll({
			where: {
				service_type_id
			},
			raw: true
		});
		return findService;
	}
};

export default serviceService;
