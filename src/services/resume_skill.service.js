import createError from 'http-errors';
import { resume_skill, resume } from '@src/models';
import { resumeStatusEnum } from '@src/constants/resumeStatus';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';

dotenv.config();

const resumeSkillService = {
	async getOne(id) {
		const findResume = await resume_skill.findOne({
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

		return resume_skill.create({
			...data,
			status: resumeStatusEnum.SUCCESS
		});
	},

	async update(id, data) {
		return await findByPkAndUpdate(resume_skill, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(resume_skill, id);
	}
};

export default resumeSkillService;
