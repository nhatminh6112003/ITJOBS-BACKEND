import createError from 'http-errors';
import { resume_education, resume } from '@src/models';
import { resumeStatusEnum } from '@src/constants/resumeStatus';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';

dotenv.config();

const resumeEducationService = {
	async getAllByResume(resume_id) {
		const findResumeRefer = await resume_education.findAll({
			where: {
				resume_id
			},
			raw: true
		});
		if (!findResumeRefer) throw createError(404, 'Không tìm thấy bản ghi');
		return findResumeRefer;
	},
	async getOne(id) {
		const findResume = await resume_education.findOne({
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

		return resume_education.create({
			...data,
			status: resumeStatusEnum.SUCCESS
		});
	},

	async update(id, data) {
		return await findByPkAndUpdate(resume_education, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(resume_education, id);
	}
};

export default resumeEducationService;
