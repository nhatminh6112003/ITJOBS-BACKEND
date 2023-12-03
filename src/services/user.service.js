import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
// import fs from 'fs';
// import path from 'path';
import createError from 'http-errors';
import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
// import responseStatus from '../constants/responseStatus';
import { user_account } from '../models';
import bcryptHelpers from '../helpers/bcrypt';
import { findByPkAndUpdate } from '../helpers/databaseHelpers';

const { Op } = Sequelize;

dotenv.config();

const userService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const keyword = query.keyword ?? '';
		const user_type_id = query.user_type_id ?? '';

		const queryCondition = {};
		if (keyword) {
			queryCondition.name = { [Op.substring]: keyword };
		}

		if (user_type_id) {
			queryCondition.user_type_id = user_type_id;
		}

		const data = await user_account.findAndCountAll({
			where: queryCondition,
			offset: (page - 1) * limit,
			limit,
			raw: true,
			attributes: { exclude: ['password'] }
		});

		const pagination = {
			totalPages: Math.ceil(data.count / limit),
			totalItems: data?.count,
			itemsPerPage: limit,
			pageIndex: page
		};
		return [data.rows, pagination];
	},

	async getOne(id) {
		const user = await user_account.findOne({
			where: { id },
			raw: true,
			attributes: { exclude: ['password'] }
		});
		if (!user) throw createError(409, 'Người dùng không tồn tại');
		return user;
	},

	async update(data, id) {
		this.getOne(id);
		return await user_account.update(data, {
			where: { id }
		});
	},

	async delete(id) {
		const deleteUser = await user_account.destroy({ where: { id } });
		if (deleteUser === 0) throw createError(400, 'Xoá user không thành công');
		return deleteUser;
	},

	async downloadPdf(req, res) {
		const { url } = req.body;
		try {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();

			await page.goto(url, { waitUntil: 'networkidle2' });
			await page.emulateMediaType('screen');
			const pdf = await page.pdf({
				margin: {
					top: '100px',
					right: '50px',
					bottom: '100px',
					left: '50px'
				},
				printBackground: true,
				format: 'A4'
			});

			res.contentType('application/pdf');
			res.send(pdf);
			await browser.close();
		} catch (error) {
			res.status(500).json({ message: 'Failed to generate PDF' });
		}
	},

	async changePassword(data, id) {
		const { password, newPassword, confirmPassword } = data;
		const user = await user_account.findOne({
			where: { id },
			raw: true
		});
		if (!user) throw createError(409, 'Người dùng không tồn tại');

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) throw createError(401, 'Mật không chính xác');

		if (confirmPassword !== newPassword) {
			throw createError(400, 'Mật khẩu không giống nhau');
		}

		const hashedPassword = await bcryptHelpers.hashPassword(newPassword);

		return await findByPkAndUpdate(user_account, id, { password: hashedPassword });
	},

	async analysis(query) {
		const { user_type_id } = query;
		const count = await user_account.count({
			where: {
				user_type_id
			}
		});
		if (!count) {
			throw createError(404, 'Không tìm thấy bản ghi');
		}
		return count;
	}
};
export default userService;
