import createError from 'http-errors';
import { resume_refer, resume } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';

dotenv.config();

const resumeReferService = {

	async getAllByResume(resume_id){
		const findResumeRefer = await resume_refer.findAll({
			where: {
				resume_id
			},
			raw: true
		});
		if (!findResumeRefer) throw createError(404, 'Không tìm thấy bản ghi');
		return findResumeRefer;
	},

	async getOne(id) {
		const findResume = await resume_refer.findOne({
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
