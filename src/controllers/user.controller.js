import userService from "@src/services/user.service.js";
import responseStatus from "@src/constants/responseStatus";

import dotenv from "dotenv";
dotenv.config();
class User {
  async getAllUser(req,res){
   const data= await userService.dataUser()
   return res.status(200).json({data})
  }

  async dashboard(req, res) {
    const data = req.body;

    // const data = await userService.dataUser();
    res.status(200).json({ status: "dashboard", data });
  }
  async home(req, res) {
    res.render("home", { data: [1, 2, 3], layout: null });

    // const data = await userService.dataUser();
  }
  async updateUser(req, res) {
    const data = req.body;
    await userService.updateUser(data);
    res.status(200).json({ status: "success" });
  }

  async downloadCvProfile(req, res) {
    // res.render("template", { data:[1,2,3], layout: null });
    await userService.generatePdf(res);

    // res.render("template", { data:[1,2,3], layout: null });
    // res.status(200).json({status:"success"});
  }
  async dowloadPdf(req, res) {
    await userService.testGenerate(req,res);    
  }
  async viewPdf(req, res) {
    res.render("template", { data: [1, 2, 3], layout: null });
  }

 
  async dataUser(req, res) {
    const { userRefreshToken } = req.cookies;
    const data = await userService.dataUser();
    return res.json({ ...responseStatus.SUCCESS, data });
  }
  async uploadFile(req, res) {
    const file = req.files.image; 
    
  }

}
module.exports = new User();
