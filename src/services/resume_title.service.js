import createError from 'http-errors';
import { resume_title } from '@src/models';
import { resumeStatusEnum } from '@src/constants/resumeStatus';
import { findByPkAndUpdate } from '@src/helpers/databaseHelpers';

const resumeTitleService = {
	async update(resume_id, data) {
		return await findByPkAndUpdate(resume_title, resume_id, {
			...data,
			status: resumeStatusEnum.SUCCESS
		});
	}
};

export default resumeTitleService;
