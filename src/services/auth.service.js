import bcryptHelpers from '../helpers/bcrypt';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import {
	user_account,
	resume,
	resume_profile,
	resume_title,
	sequelize,
	resume_desired_job,
	resume_template,
	company
} from '../models';
import createError from 'http-errors';
import { colorsEnum } from '../constants/resumeTemplateEnum';
import UserRoleEnum from '../constants/userRoles';

dotenv.config();
// nếu viết mỗi throw không thì nó sẽ trả về tương ứng ví dụ throw "lỗi"; thì nó sẽ trả về một string là lỗi còn với throw new Error("lỗi rồi") nó sẽ trả về một object có thuộc tính là name,message,stack
// throw new Error khác với new Error ở chỗ là  throw new Error  sẽ chạy vào catch còn new Error thì không
const AuthService = {
	async create(data) {
		const { email, user_type_id, password } = data;
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
			// Thêm người dùng vào cơ sở dữ liệu
			let newUser = await user_account.create(
				{
					...data,
					password: hashedPassword
				},
				{ transaction }
			);
			newUser = newUser.get({ plain: true });

			// resume_type_id=1 hồ sơ itjobs
			let createResume = await resume.create(
				{
					user_account_id: newUser.id,
					resume_type_id: 1
				},
				{ transaction }
			);
			createResume = createResume.get({ plain: true });
			await Promise.all([
				resume_profile.create(
					{
						resume_id: createResume.id,
						user_account_id: newUser.id
					},
					{ transaction }
				),
				resume_title.create(
					{
						resume_id: createResume.id,
						title: ''
					},
					{ transaction }
				),
				resume_template.create(
					{
						resume_id: createResume.id,
						cv_color: 101,
						cv_font: 'Roboto',
						cv_font_color: 'fontCVColorBlack',
						cv_language: 'vi',
						cv_size: 'fontCVsize14',
						cv_template_id: 1,
						default_color: colorsEnum[121],
						default_font: 'fontCVRoboto',
						default_size: 'fontCVsize14',
						default_template_name: 'CVHay Quản lý',
						default_template_color: '121',
						default_template: 'cv-template-13'
					},
					{ transaction }
				),
				// resume_template.create(
				// 	{
				// 		resume_id: createResume.id,
				// 		cv_color: 101,
				// 		cv_font: 'Roboto',
				// 		cv_font_color: 'fontCVColorBlack',
				// 		cv_language: 'en',
				// 		cv_size: 'fontCVsize14',
				// 		cv_template_id: 1,
				// 		default_color: colorsEnum[101],
				// 		default_font: 'fontCVRoboto',
				// 		default_size: 'fontCVsize14',
				// 		default_template_name: 'CVHay Mới tốt nghiệp',
				// 		default_template_color: '101',
				// 		default_template: 'cv-template-11'
				// 	},
				// 	{ transaction }
				// ),
				resume_desired_job.create(
					{
						resume_id: createResume.id
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
		const queryOptions = {
			where: { email, user_type_id },
			raw: true,
			nest: true
		};

		if (user_type_id === UserRoleEnum.JOBSEEKER) {
			queryOptions.include = [{ model: resume, as: 'resume', attributes: ['id'] }];
		} else if (user_type_id === UserRoleEnum.EMPLOYER) {
			queryOptions.include = [{ model: company, as: 'company' }];
		} else {
			queryOptions.include = [];
		}

		const user = await user_account.findOne(queryOptions);
		if (!user) throw createError(404, 'Email không tồn tại');

		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) throw createError(401, 'Mật khẩu không chính xác');
		delete user.password;
		return user;
	}
};
export default AuthService;
