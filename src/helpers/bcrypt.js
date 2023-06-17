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
	},
	async comparePassword(res, table, data) {
		const { email, password } = data;
		const hashedPassword = await database.findById(table, { email, user_type_id: 1 }, ['password']);
		const isPasswordMatch = await bcrypt.compare(password, hashedPassword[0].password);
		if (!isPasswordMatch) {
			return res.json(responseStatus.BAD_REQUEST);
		}
	}
};
export default bcryptHelpers;
