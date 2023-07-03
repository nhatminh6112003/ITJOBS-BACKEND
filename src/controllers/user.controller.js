import userService from '@src/services/user.service.js';
import responseStatus from '@src/constants/responseStatus';
import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import dotenv from 'dotenv';

dotenv.config();
const UserController = {
	async getAll(req, res) {
		const data = await userService.getAll();
		return res.apiResponse(data);
	},
	async getOne(req, res) {
		const { id } = req.params;
		const data = await userService.getOne();
		return res.apiResponse(data);
	},

	async update(req, res) {
		const data = req.body;
		await userService.update(data);
		return res.apiResponse(data);
	},
	async delete(req, res) {
		const { id } = req.params;
		await userService.delete(id);
		return res.apiResponse();
	},
	async downloadCvProfile(req, res) {
		await userService.generatePdf(res);
	},
	async dowloadPdf(req, res) {
		await userService.dowloadPdf(req, res);
	},
	async viewPdf(req, res) {
		res.render('template', { data: [1, 2, 3], layout: null });
	},
	async uploadFile(req, res) {
		const file = req.files.image;
	}
};
export default asyncHandlerDecorator(UserController);
