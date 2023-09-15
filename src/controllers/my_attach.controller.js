
import dotenv from 'dotenv';
import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import myAttachService from '@src/services/my_attach.service';

dotenv.config();

const MyAttachController = {
   async getOne(req, res) {
		const { id } = req.params;
		const data = await myAttachService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const fileCv=req.file;
		const data = req.body;
		const handleCreate = await myAttachService.create({
			...data,
			file:fileCv?.filename
		});
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const fileCv=req.file;
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await myAttachService.update(id, {
			...data,
			file:fileCv?.filename
		});
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await myAttachService.delete(id);
		return res.apiResponse();
	}
};
export default asyncHandlerDecorator(MyAttachController);
