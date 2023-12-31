import createError from 'http-errors';
import { resumeStatusEnum } from '../constants/resumeStatus';
import dotenv from 'dotenv';
import { resume_experience, resume } from '../models';
import { findByPkAndUpdate, findByPkAndDelete } from '../helpers/databaseHelpers';

dotenv.config();

const resumeExperienceService = {
	async getAllByResume(resume_id) {
		const findResumeRefer = await resume_experience.findAll({
			where: {
				resume_id
			},
			raw: true
		});
		if (!findResumeRefer) throw createError(404, 'Không tìm thấy bản ghi');
		return findResumeRefer;
	},
	async getOne(id) {
		const findResume = await resume_experience.findOne({
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

		return resume_experience.create({
			...data,
			status: resumeStatusEnum.SUCCESS
		});
	},

	async update(id, data) {
		return await findByPkAndUpdate(resume_experience, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(resume_experience, id);
	}
};

export default resumeExperienceService;
