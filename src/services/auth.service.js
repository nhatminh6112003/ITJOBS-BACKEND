import responseStatus from '@src/constants/responseStatus';
import bcryptHelpers from '@src/helpers/bcrypt';
import ValidationError from '@src/errors/ValidationError';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { user_account } from '@src/models';
import createError from 'http-errors';

dotenv.config();
//nếu viết mỗi throw không thì nó sẽ trả về tương ứng ví dụ throw "lỗi"; thì nó sẽ trả về một string là lỗi còn với throw new Error("lỗi rồi") nó sẽ trả về một object có thuộc tính là name,message,stack
//throw new Error khác với new Error ở chỗ là  throw new Error  sẽ chạy vào catch còn new Error thì không
const AuthService = {
	async create({ email, user_type_id }) {
		const findUser = await user_account.findOne({
			where: { email, user_type_id },
			attributes: ['email']
		});
		if (findUser) createError(409, 'Email đã tồn tại');
		// Mã hóa mật khẩu người dùng trước khi lưu vào cơ sở dữ liệu
		const hashedPassword = await bcryptHelpers.hashPassword(data.password);
		//Thêm người dùng vào cơ sở dữ liệu
		const newUser = await User.create({
			email: data.email,
			password: hashedPassword,
			user_type_id: data.user_type_id
		});
		if (!newUser) throw createError(500, 'Thêm mới người dùng thất bại');
		return newUser;
	},

	async authentication({ email, password, user_type_id }) {
		const user = await user_account.findOne({
			where: { email, user_type_id },
			raw: true
		});
		if (!user) throw createError(404, 'Email không tồn tại');

		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) throw createError(401, 'Mật khẩu không chính xác');

		return user;
	},
	async findUser(data) {
		const { email, id, user_type_id } = data;
		const user = await authModel.findById({ id, email, user_type_id }, ['refresh_token']);
		if (user.length == 0) {
			return null;
		}
		return user;
	},

	updateRefeshToken({ refreshToken: refresh_token, id }) {
		return new Promise(async (resolve, reject) => {
			try {
				await authModel.update({ refresh_token }, { id });
				resolve();
			} catch (err) {
				reject(err);
			}
		});
	},
	// Hàm xoá người dùng
	deleteRefeshToken({ id }) {
		return new Promise(async (resolve, reject) => {
			try {
				await authModel.update({ refresh_token: '' }, { id });
				resolve();
			} catch (err) {
				reject(err);
			}
		});
	},

	// Hàm cập nhật thông tin người dùng
	update() {
		// ...
	}
};
export default AuthService;
