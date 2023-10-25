import { resume, resume_title } from '@src/models';
import createError from 'http-errors';
import { findByPkAndUpdate, handlePaginate, findOneAndUpdate } from '@src/helpers/databaseHelpers';
import { Sequelize } from 'sequelize';

const { Op } = Sequelize;

const resumeService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const queryCondition = {};

		if (keyword) {
			queryCondition.name = { [Op.substring]: keyword };
		}
		if (query.user_account_id) {
			const { user_account_id } = query;
			queryCondition.user_account_id = { [Op.eq]: user_account_id };
		}
		if (query.isDeleted) {
			const { isDeleted } = query;
			queryCondition.isDeleted = { [Op.eq]: isDeleted };
		}
		if (query.resume_type_id) {
			const { resume_type_id } = query;
			queryCondition.resume_type_id = { [Op.eq]: resume_type_id };
		}
		const [data, pagination] = await handlePaginate({
			model: resume,
			page,
			limit,
			condition: queryCondition,
			queries: {
				raw: true,
				nest: true,
				include: { model: resume_title, as: 'resume_title' }
			}
		});
		return [data, pagination];
	},
	// async getAllByResumeId
	async getOne(id) {
		const findResume = await resume.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},
	async create(data) {
		return resume.create(data);
	},
	async update(id, data) {
		return await findByPkAndUpdate(resume, id, data);
	},
	async updateResumeStatus(id, data) {
		return await findByPkAndUpdate(resume, id, data);
	},
	async delete(id) {
		return await findOneAndUpdate(resume, { id }, { isDeleted: true });
	}
};

export default resumeService;
