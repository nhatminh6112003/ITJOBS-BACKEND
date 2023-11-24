
import createError from 'http-errors';
import dotenv from 'dotenv';
import { resumeStatusEnum } from '../constants/resumeStatus';
import { resume, resume_activity } from '../models';
import { findByPkAndDelete, findByPkAndUpdate } from '../helpers/databaseHelpers';

dotenv.config();

const resumeActivityService = {
	async getAllByResume(resume_id) {
		const findResumeActivity = await resume_activity.findAll({
			where: {
				resume_id
			},
			raw: true
		});
		if (!findResumeActivity) throw createError(404, 'Không tìm thấy bản ghi');
		return findResumeActivity;
	},
	async getOne(id) {
		const findResume = await resume_activity.findOne({
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

		return resume_activity.create({
			...data,
			status: resumeStatusEnum.SUCCESS
		});
	},

	async update(id, data) {
		return await findByPkAndUpdate(resume_activity, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(resume_activity, id);
	}
};

export default resumeActivityService;
