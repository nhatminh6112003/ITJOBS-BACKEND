import { resumeStatusEnum } from '../constants/resumeStatus';
import createError from 'http-errors';
import { resume_profile, user_account, resume } from '../models';
import { findByPkAndUpdate, findOneAndUpdate } from '../helpers/databaseHelpers';

const resumeProfileService = {
	async getOne(user_id) {
		const userAccount = await user_account.findOne({
			where: {
				id: user_id
			},
			include: [{ model: resume, as: 'resume' }],
			nest: true,
			raw: true
		});
		const { firstname, lastname } = userAccount;
		if (!userAccount) throw createError(404, 'Không tìm thấy bản ghi');

		const findResume = await resume_profile.findOne({
			where: {
				user_account_id: user_id
			},
			raw: true
		});
		return { ...findResume, firstname, lastname };
	},
	async update(user_id, data) {
		const { firstname, lastname, ...informationUser } = data;
		await findOneAndUpdate(
			user_account,
			{
				id: user_id
			},
			{
				firstname,
				lastname
			}
		);
		return findOneAndUpdate(
			resume_profile,
			{
				user_account_id: user_id
			},
			{
				...informationUser,
				status: resumeStatusEnum.SUCCESS
			}
		);
	}
};

export default resumeProfileService;
