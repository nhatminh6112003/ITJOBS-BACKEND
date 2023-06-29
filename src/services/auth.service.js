import responseStatus from '@src/constants/responseStatus';
import bcryptHelpers from '@src/helpers/bcrypt';
import ValidationError from '@src/errors/ValidationError';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { user_account, resume, resume_profile, resume_title } from '@src/models';
import createError from 'http-errors';
import { sequelize } from '@src/models';
dotenv.config();
//nếu viết mỗi throw không thì nó sẽ trả về tương ứng ví dụ throw "lỗi"; thì nó sẽ trả về một string là lỗi còn với throw new Error("lỗi rồi") nó sẽ trả về một object có thuộc tính là name,message,stack
//throw new Error khác với new Error ở chỗ là  throw new Error  sẽ chạy vào catch còn new Error thì không
const AuthService = {
	async create({ email, password, user_type_id, firstname, lastname }) {
		const transaction = await sequelize.transaction();
		try {
			const findUser = await user_account.findOne({
				where: { email, user_type_id },
				attributes: ['email'],
				raw: true
			});

			if (findUser) throw createError(409, 'Email đã tồn tại');
			// Mã hóa mật khẩu người dùng trước khi lưu vào cơ sở dữ liệu
			const hashedPassword = await bcryptHelpers.hashPassword(password);
			//Thêm người dùng vào cơ sở dữ liệu
			let newUser = await user_account.create(
				{
					email,
					password: hashedPassword,
					user_type_id
				},
				{ transaction }
			);
			newUser = newUser.get({ plain: true });
			console.log("🚀 ~ file: auth.service.js:35 ~ create ~ newUser:", newUser)
			
			//resume_type_id=1 hồ sơ itjobs
			let createResume = await resume.create(
				{
					user_account_id: newUser.id,
					resume_type_id: 1
				},
				{ transaction }
			);
			createResume = createResume.get({ plain: true });
			console.log(createResume);
			const [createInfo, createResumeTitle] = await Promise.all([
				resume_profile.create(
					{
						resume_id: createResume.id,
						firstname,
						lastname
					},
					{ transaction }
				),
				resume_title.create(
					{
						resume_id: createResume.id,
						title: ''
					},
					{ transaction }
				)
			]);

			if (!newUser) throw createError(500, 'Thêm mới người dùng thất bại');

			await transaction.commit();

			delete newUser.password;

			return newUser;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},

	async authentication({ email, password, user_type_id }) {
		const user = await user_account.findOne({
			where: { email, user_type_id },
			raw: true
		});

		if (!user) throw createError(404, 'Email không tồn tại');

		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) throw createError(401, 'Mật khẩu không chính xác');
		delete user.password;
		return user;
	}
};
export default AuthService;
