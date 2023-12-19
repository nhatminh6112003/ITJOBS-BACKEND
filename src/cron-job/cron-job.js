import cron from 'node-cron';
import moment from 'moment';
import { Sequelize } from 'sequelize';
import jobPostStatusEnum from '../constants/jobPostStatusEnum';
import { job_post, company_service } from '../models';
import { findByPkAndDelete, findByPkAndUpdate } from '../helpers/databaseHelpers';

const { Op } = Sequelize;
const cronJob = () => {
	cron.schedule('0 0 * * *', async () => {
		const currentDate = moment().toISOString();

		try {
			const findAllJobPostExpired = await job_post.findAll({
				where: {
					expiry_date: {
						[Op.lt]: currentDate
					},
					status: {
						[Op.ne]: jobPostStatusEnum.Expired
					}
				},
				raw: true
			});

			findAllJobPostExpired.forEach(async (item) => {
				await job_post.update(
					{
						status: jobPostStatusEnum.Expired
					},
					{
						where: {
							id: item.id
						}
					}
				);
			});
		} catch (error) {
			console.log('TCL: updateStatusExpiredDate -> error', error);
		}
	});
	cron.schedule('0 0 * * *', async () => {
		const currentDate = moment().toISOString();
		try {
			const findAllCompanyService = await company_service.findAll({
				where: {
					expiration_date: {
						[Op.lt]: currentDate
					},
					isExpiry: false
				},
				raw: true
			});
			if (findAllCompanyService.length > 0) {
				findAllCompanyService.forEach(async (item) => {
					let newQuantity = 0;
					if (item.quantity > 1) {
						newQuantity = item?.quantity - 1;
						await company_service.create({
							company_id: item.company_id,
							user_account_id: item.user_account_id,
							service_id: item.service_id,
							expiration_date: item.expiration_date,
							register_date: item.register_date,
							quantity: 1,
							isActive: false,
							isExpiry: true
						});
						await company_service.update(
							{
								quantity: newQuantity,
								isActive: false,
								expiration_date: null,
								register_date: null
							},
							{
								where: {
									id: item.id
								}
							}
						);
					} else {
						await company_service.create({
							company_id: item.company_id,
							user_account_id: item.user_account_id,
							service_id: item.service_id,
							expiration_date: item.expiration_date,
							register_date: item.register_date,
							quantity: 1,
							isActive: false,
							isExpiry: true
						});
						await findByPkAndDelete(company_service, item.id);
					}
				});
			}
		} catch (error) {}
	});
	cron.schedule('0 */8 * * *', async () => {
		try {
			const data = await company_service.findAll();
			data.forEach(async (item) => {
				await findByPkAndUpdate(company_service, item.id, { priority_level: item.priority_level + 1 });
			});
		} catch (error) {}
	});
};

export default cronJob;
