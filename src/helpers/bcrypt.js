import bcrypt from 'bcrypt';
import responseStatus from '@src/constants/responseStatus';

const bcryptHelpers = {
	hashPassword(password) {
		return new Promise(async (resolve, reject) => {
			try {
				const hashPassword = await bcrypt.hash(password, 10);
				resolve(hashPassword);
			} catch (e) {
				reject(e);
			}
		});
	}
};
export default bcryptHelpers;
