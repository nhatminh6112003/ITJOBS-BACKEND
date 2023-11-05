import createError from 'http-errors';
import { service } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';

dotenv.config();

const serviceService = {
	async getAll() {
		const findResumeRefer = await service.findAll();
		if (!findResumeRefer) throw createError(404, 'Không tìm thấy bản ghi');
		return findResumeRefer;
	},
	async getOne(id) {
		const findResume = await service.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},

	async create(data) {
		return await service.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(service, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(service, id);
	}
};

export default serviceService;
