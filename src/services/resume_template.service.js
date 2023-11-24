import createError from 'http-errors';
import { resume_template, cv_template } from '../models';

import { findOneAndUpdate } from '../helpers/databaseHelpers';


const resumeTemplateService = {
	async getOne(resume_id) {
		const findResume = await resume_template.findOne({
			where: {
				resume_id
			},
			include: [
				{ model: cv_template, as: 'cvTemplate', attributes: ['html_template_en', 'html_template_vi', 'color_pick'] }
			],
			raw: true,
			nest: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},
	async updateUiCv(resume_id, data) {
		const handleUpdate = await findOneAndUpdate(resume_template, { resume_id }, data);
		return handleUpdate;
	},
	async changeTemplate(resume_id, data) {
		const { cv_template_id } = data;
		const dataTemplate = await cv_template.findOne({
			where: { id: cv_template_id },
			attributes: {
				exclude: ['id']
			},
			raw: true
		});
		const handleData = {
			...dataTemplate,
			cv_color: dataTemplate.default_template_color,
			cv_font_color: 'fontCVColorBlack',
			cv_template_id
		};
		const handleUpdate = await findOneAndUpdate(resume_template, { resume_id }, handleData);
		return handleUpdate;
	}
};
export default resumeTemplateService;
