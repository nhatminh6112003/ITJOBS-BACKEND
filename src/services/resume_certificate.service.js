import createError from 'http-errors';
import dotenv from 'dotenv';
import { resume_certificate, resume } from '../models';
import { findByPkAndUpdate, findByPkAndDelete } from '../helpers/databaseHelpers';

dotenv.config();

const resumeCertificateService = {
	async getAllByResume(resume_id) {
		const findResumeCertificate = await resume_certificate.findAll({
			where: {
				resume_id
			},
			raw: true
		});
		if (!findResumeCertificate) throw createError(404, 'Không tìm thấy bản ghi');
		return findResumeCertificate;
	},
	async getOne(id) {
		const findResume = await resume_certificate.findOne({
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
