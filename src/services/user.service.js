import responseStatus from '@src/constants/responseStatus';
import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import createError from 'http-errors';
import { user_account } from '@src/models';

dotenv.config();

const userService = {
	async getAll() {
		const data = await user_account.findAll({
			raw: true,
			attributes: { exclude: ['password'] }
		});
		return data;
	},

	async getOne(id) {
		const user = await user_account.findOne({ where: { id }, raw: true, attributes: { exclude: ['password'] } });
		if (!user) throw createError(404, 'Người dùng không tồn tại');
	},

	async update(data, id) {
			this.getOne(id);
			const updateUser = await user_account.update(data, {
				where: { id }
			});
	},

	async delete(id) {
		const deleteUser = await User.destroy({ where: { id } });
		if (deleteUser === 0) throw createError(400, 'Xoá user không thành công');
		return deleteUser;
	},

	async generatePdf(res) {
		try {
			const htmlFilePath = '../views/template.hbs';
			const absoluteHtmlFilePath = path.resolve(__dirname, htmlFilePath);
			const html = await fs.readFileSync(absoluteHtmlFilePath, 'utf8');
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			await page.setContent(html);

			const pdf = await page.pdf({ format: 'A4' });

			res.contentType('application/pdf');

			res.send(pdf);
			await browser.close();
		} catch (error) {
			res.json(responseStatus.INTERNAL_SERVER_ERROR);
		}
	},

	async dowloadPdf(req, res) {
		const { url } = req.body;
		try {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();

			await page.goto(url, { waitUntil: 'networkidle2' });
			await page.emulateMediaType('screen');
			const pdf = await page.pdf({
				margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
				printBackground: true,
				format: 'A4'
			});

			res.contentType('application/pdf');
			res.send(pdf);
			await browser.close();
		} catch (error) {
			res.status(500).json({ message: 'Failed to generate PDF' });
		}
	}
};
export default userService;
