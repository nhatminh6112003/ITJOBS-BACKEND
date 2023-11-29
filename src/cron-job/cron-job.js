import cron from 'node-cron';
import moment from 'moment';
import { Sequelize } from 'sequelize';
import jobPostStatusEnum from '../constants/jobPostStatusEnum';
import { job_post } from '../models';

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
};

export default cronJob;
