import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import responseStatus from '@src/constants/responseStatus';

dotenv.config();
const JwtHelpers = {
	async signAccessToken(payload) {
		// Hàm sign trong thư viện jsonwebtoken dùng để tạo một JSON Web Token (JWT) từ một object và một khóa bí mật.
		try {
			// const results = await Promise.all([function1(), function2()]);
			const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
				algorithm: 'HS256',
				expiresIn: '1h'
			});

			return accessToken;
		} catch (error) {
			console.log(error);
		}
	},

	async signRefreshToken(payload) {
		// Hàm sign trong thư viện jsonwebtoken dùng để tạo một JSON Web Token (JWT) từ một object và một khóa bí mật.

		try {
			const refreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
				algorithm: 'HS256',
				expiresIn: '30d'
			});
			return refreshToken;
		} catch (error) {
			return null;
		}
	}
};
export default JwtHelpers;
