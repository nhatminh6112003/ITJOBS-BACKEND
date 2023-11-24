import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import userService from '../services/user.service.js';
import responseStatus from '../constants/responseStatus';
import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';

dotenv.config();
const UserController = {
	async getAll(req, res) {
		const { query } = req;
		const [data, pagination] = await userService.getAll(query);

		return res.apiResponse(data,pagination);
	},
	async getOne(req, res) {
		const { id } = req.params;
		const data = await userService.getOne(id);
		return res.apiResponse(data);
	},

	async update(req, res) {
		const {id}=req.params
		const data = req.body;
		await userService.update(data,id);
		return res.apiResponse(data);
	},
	async delete(req, res) {
		const { id } = req.params;
		await userService.delete(id);
		return res.apiResponse();
	},
	async downloadPdf(req, res) {
		await userService.downloadPdf(req, res);
	},
	async viewPdf(req, res) {
		res.render('template', { data: [1, 2, 3], layout: null });
	},
	async uploadFile(req, res) {
		const file = req.files.image;
	}
};
export default asyncHandlerDecorator(UserController);
