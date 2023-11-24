import createError from 'http-errors';
import dotenv from 'dotenv';
import { work_type } from '../models';

dotenv.config();
const workTypeService = {
	async getAll() {
		const findResumeCertificate = await work_type.findAll({
			raw: true
		});
		if (!findResumeCertificate) throw createError(404, 'Không tìm thấy bản ghi');
		return findResumeCertificate;
	}
};

export default workTypeService;
