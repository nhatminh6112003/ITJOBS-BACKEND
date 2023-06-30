import authService from '@src/services/auth.service.js';
import responseStatus from '@src/constants/responseStatus';
import JwtHelpers from '@src/helpers/jwt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const AuthController = {
	async register(req, res, next) {
		const data = req.body;

		try {
			const insertUser = await authService.create(data);

			return res.apiResponse(insertUser, responseStatus.SUCCESS);
		} catch (error) {
			next(error);
		}
	},

	async login(req, res, next) {
		const data = req.body;
		try {
			const dataUser = await authService.authentication(data);

			const [accessToken, refreshToken] = await Promise.all([
				JwtHelpers.signAccessToken(dataUser),
				JwtHelpers.signRefreshToken(dataUser)
			]);

			res.apiResponse({ accessToken, refreshToken, ...dataUser }, responseStatus.SUCCESS);
		} catch (error) {
			next(error);
		}
	},
	async refreshToken(req, res) {
		const { refreshToken } = req.body;
		try {
			const decoded = refreshToken && (await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET));

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
