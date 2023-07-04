import createError from 'http-errors';
import { resume_certificate, resume } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';

dotenv.config();

const resumeCertificateService = {
	async getOne(id) {
		const findResume = await resume_certificate.findOne({
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

		return resume_certificate.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(resume_certificate, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(resume_certificate, id);
	}
};

export default resumeCertificateService;
