import createError from 'http-errors';
import { resume_addioninfo, resume } from '@src/models';
import { resumeStatusEnum } from '@src/constants/resumeStatus';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';

dotenv.config();

const resumeAddioninfoService = {
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