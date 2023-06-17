import authService from '@src/services/auth.service.js';
import responseStatus from '@src/constants/responseStatus';
import JwtHelpers from '@src/helpers/jwt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import AuthSchema from '@src/schemas/auth.schema';
import createError from 'http-errors';
import ValidationError from '@src/errors/ValidationError';
dotenv.config();
const AuthController = {
	async register(req, res, next) {
		const data = req.body;

		try {
			const insertUser = await authService.create(data);
			return res.json(responseStatus.SUCCESS);
		} catch (error) {
			next(error);
		}
	},

	//login jobseeker
	async login(req, res, next) {
		const data = req.body;
		try {
			// const { error } = await AuthSchema.login.validate(data, { abortEarly: false });
			// if (error) throw new ValidationError(error?.details);

			// res.cookie('accessToken', accessToken, { httpOnly: true });
			//phải query từ database để xác thực tên tài khoản mật khẩu có đúng không sau đó mới ủy quyền
			const dataUser = await authService.authentication(data);
			const { password, refresh_token, ...rest } = dataUser;

			const [accessToken, refreshToken] = await Promise.all([
				JwtHelpers.signAccessToken(rest),
				JwtHelpers.signRefreshToken(rest)
			]);
			// const updateRefreshToken = await authService.updateRefeshToken({
			//   refreshToken,
			//   id: rest.id,
			// });
			// res.cookie("userRefreshToken", refreshToken, {
			//   maxAge: 3.154e10, // 1 year
			//   sameSite: "strict",
			//   secure: false,
			//   httpOnly: true,
			//   domain:"localhost"
			// });
			res.apiResponse({ accessToken, refreshToken, ...rest }, responseStatus.SUCCESS);
		} catch (error) {
			next(error);
		}
	},
	// const currentTime = Math.floor(Date.now() / 1000);
	//     const refreshTokenExpiration = currentTime - 60;
	//     const expiredRefreshToken = jwt.sign({ sub: user.id },process.env.REFRESH_TOKEN_SECRET, { expiresIn: refreshTokenExpiration });

	async logout(req, res) {
		const { userRefreshToken } = req.cookies;
		try {
			const decoded = userRefreshToken && (await jwt.verify(userRefreshToken, process.env.REFRESH_TOKEN_SECRET));
			const authUser = await authService.findUser(decoded);
			if (!authUser) {
				return res.status(404).send({ message: 'User not found' });
			}
			const deleteRefeshToken = await authService.deleteRefeshToken({
				id: decoded.id
			});
			res.cookie('userRefreshToken', '', {
				expires: new Date(0),
				httpOnly: true
			});
			res.clearCookie('userRefreshToken');
			return res.json({
				...responseStatus.SUCCESS,
				message: 'Logout successful'
			});
		} catch (error) {
			if (error.name === 'JsonWebTokenError') {
				return res.status(200).json({ code: 401, message: error.message });
			} else if (error.name === 'TokenExpiredError') {
				const decoded = await jwt.verify(userRefreshToken, process.env.REFRESH_TOKEN_SECRET);
				const authUser = await authService.findUser(decoded);
				if (!authUser) {
					return res.json({
						...responseStatus.NOT_FOUND,
						error: 'User not found'
					});
				}
				const deleteRefeshToken = await authService.deleteRefeshToken({
					id: decoded.id
				});
				res.clearCookie('userRefreshToken');
				return res.json({
					...responseStatus.SUCCESS,
					message: 'Token expired'
				});
			}
			return res.json(responseStatus.UNAUTHORIZED);
		}
	},

	async refreshToken(req, res) {
		const { refreshToken } = req.body;
		try {
			const decoded = refreshToken && (await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET));
			const authUser = await authService.findUser(decoded);

			if (!authUser) {
				return res.json({
					...responseStatus.NOT_FOUND,
					error: 'User not found'
				});
			}
			const { iat, exp, ...rest } = decoded;

			if (exp < Date.now() / 1000) {
				return res.status(200).json({ code: 401, message: 'Refresh token expired' });
			}
			const accessToken = await JwtHelpers.signAccessToken(rest);
			return res.json({ ...responseStatus.SUCCESS, data: { accessToken } });
		} catch (error) {
			if (error.name === 'TokenExpiredError') {
				return res.json({
					...responseStatus.UNAUTHORIZED,
					message: 'Refresh token expired'
				});
			} else if (error.name === 'JsonWebTokenError') {
				return res.status(200).json({ code: 401, message: error.message });
			}
			return res.json({ message: error.message });
		}
	}
};
export default AuthController;
