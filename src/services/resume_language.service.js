import responseStatus from '@src/constants/responseStatus';
import createError from 'http-errors';
import { resume_language } from '@src/models';
import { resumeStatusEnum } from '@src/constants/resumeStatus';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';

dotenv.config();

const resumeLanguageService = {
	async create(data) {
		return await resume_language.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(resume_language, id, {
			...data,
			status: resumeStatusEnum.SUCCESS
		});
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
		if (!oneLanguage) throw createError(400, 'không có dữ liệu này');
		return oneLanguage;
	}
};

export default resumeLanguageService;
