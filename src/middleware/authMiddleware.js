import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import responseStatus from '../constants/responseStatus';
import { user_account } from '../models';

const AuthMiddleWare = {
	async protect(req, res, next) {
		let token;
		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
			token = req.headers.authorization.split(' ')[1];
		}
		// Nếu không có token hoặc token không hợp lệ, trả về lỗi 401 Unauthorized
		try {
			// Xác thực token với khóa bí mật
			if (!token) throw createError(401, 'You dont have permission');
			const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
			const { email, user_type_id } = decoded;
			const user = await user_account.findOne({
				where: { email, user_type_id }
			});

			if (!user) {
				return res.status(responseStatus.UNAUTHORIZED.status).send({ error: 'Unauthorized' });
			}
			// Lưu thông tin người dùng vào request để sử dụng trong các middleware tiếp theo
			req.user = user;
			next();
		} catch (error) {
			// Nếu token không hợp lệ, trả về lỗi 401 Unauthorized
			if (error.name === 'TokenExpiredError') {
				return res.status(200).json({ code: 401, message: error.message });
			}
			if (error.name === 'JsonWebTokenError') {
				return res.status(200).json({ code: 401, message: error.message });
			}
			next(error);
		}
		return token;
	},

	authPage(permission) {
		return (req, res, next) => {
			const { user_type_id } = req.user;
			try {
				if (!user_type_id) {
					throw createError(401, `You don't have permission`);
				}
				if (!permission.includes(user_type_id)) {
					throw createError(401, `You don't have permission`);
				}
				next();
			} catch (error) {
				next(error);
			}
		};
	}
};

export default AuthMiddleWare;
