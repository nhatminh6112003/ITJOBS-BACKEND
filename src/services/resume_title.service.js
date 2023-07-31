import createError from 'http-errors';
import { resume_title } from '@src/models';
import { resumeStatusEnum } from '@src/constants/resumeStatus';
import { findByPkAndUpdate } from '@src/helpers/databaseHelpers';

const resumeTitleService = {
	async getOne(resume_id) {
		const findResume = await resume_title.findOne({
			where: {
				resume_id
			},
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},
	async update(resume_id, data) {
		return await findByPkAndUpdate(resume_title, resume_id, {
			...data,
			status: resumeStatusEnum.SUCCESS
		});
	}
};

export default resumeTitleService;
