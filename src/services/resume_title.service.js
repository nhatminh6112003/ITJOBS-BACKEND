import createError from 'http-errors';
import { resume_title } from '@src/models';
import { resumeStatusEnum } from '@src/constants/resumeStatus';
import { findByIdAndUpdate } from '@src/helpers/databaseHelpers';
const resumeTitleService = {
	async update(resume_id, data) {
		return await findByIdAndUpdate(resume_title,resume_id, {
		   ...data,
		   status:resumeStatusEnum.SUCCESS
		});
	}
};

export default resumeTitleService;
