import createError from 'http-errors';
import {resume_objective,resume} from '@src/models'
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';


dotenv.config();

const resumeObjectiveService = {

	async getAllByResume(resume_id){
		const findResumeRefer = await resume_objective.findAll({
			where: {
				resume_id
			},
			raw: true
		});
		if (!findResumeRefer) throw createError(404, 'Không tìm thấy bản ghi');
		return findResumeRefer;
	},

	async getOne(id) {
		const findResume = await resume_objective.findOne({
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

		return resume_objective.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(resume_objective, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(resume_objective, id);
	}
};

export default resumeObjectiveService