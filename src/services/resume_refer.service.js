import createError from 'http-errors';
import { resume_refer, resume } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';

dotenv.config();

const resumeReferService = {
	async getOne(id) {
		const findResume = await resume_refer.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!findResume) throw createError(409, 'Không tìm thấy bản ghi');
		return findResume;
	},

	async create(data) {
		const findResume = await resume.findOne({
			where: { id: data.resume_id },
			raw: true
		});
		if (!findResume) throw createError(409, 'Không tìm thấy bản ghi');

		return resume_refer.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(resume_refer, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(resume_refer, id);
	}
};

export default resumeReferService;
