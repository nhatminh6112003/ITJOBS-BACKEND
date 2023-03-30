import responseStatus from "@src/constants/responseStatus";
import authModel from "@src/models/auth.model.js";
import bcryptHelpers from "@src/helpers/bcrypt.helper";
import ValidationError from "@src/errors/ValidationError";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

class AuthService {
  // Hàm tạo người dùng mới
  async createUser(data) {
    try {
      console.log(data.user_type_id)
      const findUser = await authModel.findById(
        { email:data.email, user_type_id: data.user_type_id },
        ["email"]
      );
      if (findUser.length>0) {
        throw new Error("Email đã tồn tại");
      }
      // Mã hóa mật khẩu người dùng trước khi lưu vào cơ sở dữ liệu
      const hashedPassword = await bcryptHelpers.hashPassword(data.password);
      //Thêm người dùng vào cơ sở dữ liệu
      await authModel.insert({
        email: data.email,
        password: hashedPassword,
        user_type_id: data.user_type_id,
      });
      resolve();
    } catch (err) {
      //nếu viết mỗi throw không thì nó sẽ trả về tương ứng ví dụ throw "lỗi"; thì nó sẽ trả về một string là lỗi còn với throw new Error("lỗi rồi") nó sẽ trả về một object có thuộc tính là name,message,stack 
      //throw new Error khác với new Error ở chỗ là  throw new Error  sẽ chạy vào catch còn new Error thì không
      throw err;
    }
  }

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

  async authentication(data) {
    const { email, password, user_type_id } = data;
  try {
    const user = await authModel.findById({ email, user_type_id });
    if (user.length === 0) {
      throw new Error("email not found"); 
    }
    const isPasswordMatch = await bcrypt.compare(password, user[0].password);
    if (!isPasswordMatch) {
      throw new Error("password not match");
    }
    return user;
  } catch (error) {
    throw error
  }
  }
  async findUser(data) {
    const { email, id, user_type_id } = data;
    const user = await authModel.findById({ id, email, user_type_id }, [
      "refresh_token",
    ]);
    if (user.length == 0) {
      return null;
    }
    return user;
  }

  updateRefeshToken({ refreshToken: refresh_token, id }) {
    return new Promise(async (resolve, reject) => {
      try {
        await authModel.update({ refresh_token }, { id });
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
  // Hàm xoá người dùng
  deleteRefeshToken({ id }) {
    return new Promise(async (resolve, reject) => {
      try {
        await authModel.update({ refresh_token: "" }, { id });
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  // Hàm cập nhật thông tin người dùng
  update() {
    // ...
  }
}
module.exports = new AuthService();
