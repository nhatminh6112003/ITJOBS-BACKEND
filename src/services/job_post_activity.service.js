import {
	job_post_activity,
	job_post,
	company,
	resume,
	my_attach,
	resume_title,
	user_account,
	resume_profile
} from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';
import createError from 'http-errors';
import { Sequelize } from 'sequelize';

const { Op } = Sequelize;

dotenv.config();
const jobPostActivityService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const queryCondition = {};
		const queryConditionOther = {};

		if (query.user_account_id) {
			const { user_account_id } = query;
			queryCondition.user_account_id = { [Op.eq]: user_account_id };
		}
		if (query.posted_by_id) {
			const { posted_by_id } = query;
			queryConditionOther.posted_by_id = { [Op.eq]: posted_by_id };
		}
		const [data, pagination] = await handlePaginate({
			model: job_post_activity,
			page,
			limit,
			condition: queryCondition,
			queries: {
				raw: true,
				nest: true,
				include: [
					{ model: job_post, where: queryConditionOther, include: { model: company } },
					{ model: user_account, as: 'user_account' },
					{
						model: resume,
						include: [
							{ model: resume_title },
							{ model: my_attach },
							{ model: resume_profile, as: 'resume_profile' }
						]
					}
				]
			}
		});
		return [data, pagination];
	},

	async getOne(id) {
		const dataOne = await job_post_activity.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!dataOne) {
			throw createError(404, 'Không tìm thấy bản ghi');
		}
		return dataOne;
	},

	async create(data) {
		return await job_post_activity.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(job_post_activity, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(job_post_activity, id);
	}
};

export default jobPostActivityService;
