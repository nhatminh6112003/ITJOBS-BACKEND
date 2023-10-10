import createError from 'http-errors';
import { resume_skill, resume } from '@src/models';
import { resumeStatusEnum } from '@src/constants/resumeStatus';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';

dotenv.config();

const resumeSkillService = {
	async getAllByResume(resume_id){
		const findResumeSkill = await resume_skill.findAll({
			where: {
				resume_id
			},
			raw: true
		});
		if (!findResumeSkill) throw createError(404, 'Không tìm thấy bản ghi');
		return findResumeSkill;
	},

	async getOne(id) {
		const findResume = await resume_skill.findOne({
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
