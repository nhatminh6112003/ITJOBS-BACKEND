import createError from 'http-errors';
import { resumeStatusEnum } from '../constants/resumeStatus';
import dotenv from 'dotenv';
import { resume_addioninfo, resume } from '../models';
import { findByPkAndUpdate, findByPkAndDelete } from '../helpers/databaseHelpers';

dotenv.config();

const resumeAddioninfoService = {
	async getAllByResume(resume_id) {
		const findResumeActivity = await resume_addioninfo.findAll({
			where: {
				resume_id
			},
			raw: true
		});
		if (!findResumeActivity) throw createError(404, 'Không tìm thấy bản ghi');
		return findResumeActivity;
	},
	async getOne(id) {
		const findResume = await resume_addioninfo.findOne({
			where: {
				resume_id: id,
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

		const checkresume = await resume_addioninfo.findOne({
			where: { resume_id: data.resume_id }
		})

		if (checkresume) {
			throw createError(404, 'Duplicate resume_addioninfo')
		}

		return resume_addioninfo.create({
			...data,
			status: resumeStatusEnum.SUCCESS
		});
	},

	async update(id, data) {
		return await findByPkAndUpdate(resume_addioninfo, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(resume_addioninfo, id);
	}
};

export default resumeAddioninfoService;