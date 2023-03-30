import express from "express";
import AuthMiddleWear from "@src/middleware/authMiddlewear";
import userController from "@src/controllers/user.controller";
import uploadCloud from "@src/middleware/uploadCloud";
const router = express.Router();
router.get(
  "/getAll",
  AuthMiddleWear.protect,
  userController.getAllUser
);

router.get(
  "/dashboard",
  AuthMiddleWear.protect,
  userController.dashboard
);


router.get("/home", userController.home);
router.get("/viewpdf", userController.viewPdf);
router.get("/dataUser", AuthMiddleWear.protect,userController.dataUser);

router.patch("/profile", userController.updateUser);

router.get("/downloadCvProfile", userController.downloadCvProfile);

// Middleware upload.single('image') sẽ lấy hình ảnh được upload từ form có name là 'image' và lưu trữ trong một biến req.file
// router.post("/uploadImage",uploadCloud.single("image"), userController.logout);



router.post("/generatePdf",userController.dowloadPdf);

export default router;
