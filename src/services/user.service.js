import responseStatus from "@src/constants/responseStatus";
import userModel from "@src/models/user.model.js";

import dotenv from "dotenv";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
dotenv.config();

class UserService {
  // Hàm tạo người dùng mới

  updateUser(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, id } = data;
        await userModel.update({ email }, { id });
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  // Hàm lấy tất cả thông tin người dùng
  async dataUser() {
    return userModel.getAllUser();
  }

  // Hàm mã hóa mật khẩu người dùng
  //Tương tự nhau
  //  try {
  //   const hashPassword = await bcrypt.hash(password, 10);
  //   return await hashPassword;
  // } catch (err) {
  //     console.error(err);
  // }

  async generatePdf(res) {
    try {
      const htmlFilePath = "../views/template.hbs";
      const absoluteHtmlFilePath = path.resolve(__dirname, htmlFilePath);
      const html = await fs.readFileSync(absoluteHtmlFilePath, "utf8");
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html);

      const pdf = await page.pdf({ format: "A4" });

      res.contentType("application/pdf");

      res.send(pdf);
      await browser.close();
    } catch (error) {
      res.json(responseStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async testGenerate(req,res){
    const { url } = req.body;
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
 
      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.emulateMediaType('screen');
      const pdf = await page.pdf({
        margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A4',
      });

      res.contentType('application/pdf');
      res.send(pdf);
      await browser.close();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to generate PDF' });
    }
  }

  // Hàm cập nhật thông tin người dùng
  update() {
    // ...
  }

  // Hàm xoá người dùng
  delete() {
    // ...
  }
}
module.exports = new UserService();
