import createError from 'http-errors';
import { resume_work_type, resume } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';

dotenv.config();

const resumeWorkTypeService = {
	async getOne(id) {
		const findResume = await resume_work_type.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},

	async create(data) {
		const findResume = await resume.findOne({
			where: { id: data.resume_id },
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');

		return resume_work_type.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(resume_work_type, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(resume_work_type, id);
	}
};

export default resumeWorkTypeService;