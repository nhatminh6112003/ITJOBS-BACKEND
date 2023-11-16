import {
	job_post_activity,
	job_post,
	company,
	resume,
	my_attach,
	resume_title,
	user_account,
	resume_profile
} from '@src/models';
import { findByPkAndUpdate, findByPkAndDelete, handlePaginate, findOneAndUpdate } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';
import createError from 'http-errors';
import { Sequelize } from 'sequelize';
import sendMail from '@src/helpers/mailer';
import mailTemplate from '@src/helpers/emailTemplate';
import { resumeActiveEnum } from '@src/constants/resumeStatus';

const { Op } = Sequelize;

dotenv.config();
const jobPostActivityService = {
	async getAll(query) {
		const page = Number(query.page) || 1;
		const limit = Number(query.limit) || 25;
		const queryCondition = {};
		const queryConditionOther = {};
		const queryConditionResume = {};
		const queryConditionResumeTitle = {};

		if (query.keyword) {
			queryConditionResumeTitle.title = {
				[Op.substring]: query.keyword
			};
		}

		if (query.user_account_id) {
			const { user_account_id } = query;
			queryCondition.user_account_id = { [Op.eq]: user_account_id };
		}
		if (query.posted_by_id) {
			const { posted_by_id } = query;
			queryConditionOther.posted_by_id = { [Op.eq]: posted_by_id };
		}

		if (query.resume_active == resumeActiveEnum.FLASH || query.resume_active == resumeActiveEnum.PUBLIC) {
			queryConditionResume.resume_active = { [Op.eq]: query.resume_active };
		}

		if (query.fromDate && query.toDate) {
			const { fromDate, toDate } = query;
			queryCondition.apply_date = { [Op.between]: [fromDate, toDate] };
		}

		const [data, pagination] = await handlePaginate({
			model: job_post_activity,
			page,
			limit,
			queries: {
				nest: true,
				include: [
					{ model: job_post, where: queryConditionOther, include: { model: company } },
					{ model: user_account, as: 'user_account', include: { model: resume_profile } },
					{
						model: resume,
						required: false,
						where: Object.keys(queryConditionResume).length > 0 ? queryConditionResume : null,
						include: [
							{
								model: resume_title,
								where: Object.keys(queryConditionResumeTitle).length > 0 ? queryConditionResumeTitle : null,
								required: false
							},
							{ model: my_attach }
						]
					}
				]
			}
		});
		return [data, pagination];
	},

	async getOne(id) {
		const dataOne = await job_post_activity.findOne({
			where: {
				id
			},
			raw: true
		});
		if (!dataOne) {
			throw createError(404, 'Không tìm thấy bản ghi');
		}
		return dataOne;
	},

	async create(data) {
		const createJobPostActivity = await job_post_activity.create(data);

		const findJobPostActivity = await job_post_activity.findOne({
			where: {
				job_id: data.job_id,
				user_account_id: data.user_account_id
			},
			include: [
				{ model: job_post, include: { model: company } },
				{ model: user_account, as: 'user_account' }
			],
			raw: true,
			nest: true
		});
		sendMail(
			findJobPostActivity.user_account.email,
			'Ứng tuyển thành công',
			mailTemplate(`<table style="border:1px solid black;color:rgb(0,0,0);" align="center" border="0" cellpadding="5" cellspacing="0" style="margin:0 auto" width="82%">
			<tbody style="border:1px solid black;color:rgb(0,0,0);" >
				<tr style="border:1px solid black;color:rgb(0,0,0);" >
					<td style="border:1px solid black;color:rgb(0,0,0);" colspan="2" style="font-family:Arial;font-size:12px">Chào bạn <strong style="color:rgb(0,0,0);">${findJobPostActivity.user_account.lastname} ${findJobPostActivity.user_account.firstname},</strong></td>
				</tr>
				<tr style="border:1px solid black;color:rgb(0,0,0);" >
					<td style="border:1px solid black;color:rgb(0,0,0);" align="left" colspan="2" style="font-family:Arial;font-size:12px;color:rgb(0,0,0);"><strong>Bạn vừa nộp hồ sơ ứng tuyển vào :</strong></td>
				</tr>
				<tr style="border:1px solid black;color:rgb(0,0,0);">
					<td style="border:1px solid black;" align="left" style="font-family:Arial;font-size:12px" width="30%">Công ty :</td>
					<td style="border:1px solid black;color:rgb(0,0,0);" align="left" style="font-family:Arial;font-size:12px">${findJobPostActivity.job_post.company.company_name}</td>
				</tr>
				<tr style="border:1px solid black;color:rgb(0,0,0);" >
					<td style="border:1px solid black;color:rgb(0,0,0);" align="left" style="font-family:Arial;font-size:12px;border:1px solid black;color:rgb(0,0,0);" width="30%">Vị trí ứng tuyển:</td>
					<td style="border:1px solid black;color:rgb(0,0,0);" align="left" style="font-family:Arial;font-size:12px"><p style="color:rgb(0,0,0);">${findJobPostActivity.job_post.job_title}</p></td>
				</tr>
				<tr style="border:1px solid black;color:rgb(0,0,0);">
					<td style="border:1px solid black;color:rgb(0,0,0);" align="left" colspan="2" style="font-family:Arial;font-size:12px"><strong style="color:rgb(0,0,0);font-family:Arial">Chúc bạn thành công </strong></td>
				</tr>
			</tbody>
		</table>`)
		);
		return createJobPostActivity;
	},

	async update(id, data) {
		return await findByPkAndUpdate(job_post_activity, id, data);
	},

	async updateStatusResume(resume_id, data) {
		const { job_id, status } = data;
		return await findOneAndUpdate(
			job_post_activity,
			{
				job_id,
				resume_id
			},
			{
				status
			}
		);
	},
	async sendMailJobSeeker(data) {
		const { user_account_id, title, content } = data;
		const user = await user_account.findOne({
			where: {
				id: user_account_id
			}
		});
		sendMail(user.email, title, mailTemplate(content));
	},
	async delete(id) {
		return await findByPkAndDelete(job_post_activity, id);
	}
};

export default jobPostActivityService;
