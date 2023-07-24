import createError from 'http-errors';
import { resume_language, resume } from '@src/models';
import { resumeStatusEnum } from '@src/constants/resumeStatus';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';


const resumeLanguageService = {
	async create(data) {
		const findResume = await resume.findOne({
			where: {
				id: data.resume_id
			},
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');

		return await resume_language.create({
			...data,
			status: resumeStatusEnum.SUCCESS
		});
	},

	async update(id, data) {
		return await findByPkAndUpdate(resume_language, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(resume_language, id);
	},

	async getOne(id) {
		const oneLanguage = await resume_language.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!oneLanguage) throw createError(404, 'Không tìm thấy bản ghi');
		return oneLanguage;
	}
};

export default resumeLanguageService;
