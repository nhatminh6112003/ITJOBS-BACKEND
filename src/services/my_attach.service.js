import createError from 'http-errors';
import { resume, my_attach } from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';

dotenv.config();

const myAttachService = {
	async getOne(id) {
		const findMyAttach = await my_attach.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!findMyAttach) throw createError(404, 'Không tìm thấy bản ghi');
		return findMyAttach;
	},

	async create(data) {
		const findResume = await resume.findOne({
			where: { id: data.resume_id },
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');

		return my_attach.create(data);
	},

	async update(id, data) {
		return await findByPkAndUpdate(my_attach, id, data);
	},

	async delete(id) {
		return await findByPkAndDelete(my_attach, id);
	},


};

export default myAttachService;
