import createError from 'http-errors';
import { resume_desired_job, profession_desired_job, welfare_desired_job, resume_work_type } from '@src/models';
import { findByPkAndDelete, findByPkAndUpdate } from '@src/helpers/databaseHelpers';
import { resumeStatusEnum } from '@src/constants/resumeStatus';
import dotenv from 'dotenv';
import { sequelize } from '@src/config/connectDB';

dotenv.config();

const resumeDesiredJobService = {
	async getOne(resume_id) {
		const findResume = await resume_desired_job.findOne({
			where: {
				resume_id
			},
			raw: true
		});
		const [findProfession, findWorkType, findWelfare] = await Promise.all([
			profession_desired_job.findAll({
				attributes: ['resume_id', [sequelize.fn('GROUP_CONCAT', sequelize.col('profession_id')), 'profession_id']],
				where: {
					resume_id
				},
				group: ['resume_id'],
				raw: true
			}),
			resume_work_type.findAll({
				attributes: ['resume_id', [sequelize.fn('GROUP_CONCAT', sequelize.col('work_type_id')), 'work_type_id']],
				where: {
					resume_id
				},
				group: ['resume_id'],
				raw: true
			}),
			welfare_desired_job.findAll({
				attributes: ['resume_id', [sequelize.fn('GROUP_CONCAT', sequelize.col('welfare_id')), 'welfare_id']],
				where: {
					resume_id
				},
				group: ['resume_id'],
				raw: true
			})
		]);

		findWorkType.forEach((result) => {
			findWorkType.work_type_id = result.work_type_id.split(',').map(Number);
		});
		findProfession.forEach((result) => {
			findProfession.profession_id = result.profession_id.split(',').map(Number);
		});
		findWelfare.forEach((result) => {
			findWelfare.welfare_id = result.welfare_id.split(',').map(Number);
		});
		delete findWelfare[0];
		delete findProfession[0];
		delete findWorkType[0];

		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return {
			...findResume,
			...findWelfare,
			...findProfession,
			...findWorkType
		};
	},
	async create({resume_id,profession_id,welfare_id,work_type_id, ...data }) {
		const professionIdItem=JSON.parse(profession_id);
		const welfareIdItem=JSON.parse(welfare_id);
		const workTypeIdItem=JSON.parse(work_type_id);


		const professionPromises = professionIdItem.map(async (id) =>
			await profession_desired_job.create({
				resume_id,
				profession_id: id
			})
		);

		const resumeDesiredJobPromise =await resume_desired_job.create({
			resume_id,
			...data,
			status: resumeStatusEnum.SUCCESS
		});
		const handlePromise = await Promise.all([
			...professionPromises,
			resumeDesiredJobPromise,
			welfareIdItem.map((id) =>
				welfare_desired_job.create({
					resume_id,
					welfare_id: id
				})
			),
			workTypeIdItem.map((id) =>
				resume_work_type.create({
					resume_id,
					work_type_id: id
				})
			)
		]);
		

		return handlePromise;
	},
	async update(resume_id, { welfare_id, work_type_id, profession_id, ...data }) {
		const professionIdItem=JSON.parse(profession_id);
		const welfareIdItem=JSON.parse(welfare_id);
		const workTypeIdItem=JSON.parse(work_type_id);

		// Xóa  tất cả  profession_id  trong table profession_desired_job nếu có resume_id bằng với resume_id update
		await Promise.all([
			profession_desired_job.destroy({
				where: {
					resume_id
				}
			}),
			welfare_desired_job.destroy({
				where: {
					resume_id
				}
			}),
			resume_work_type.destroy({
				where: {
					resume_id
				}
			})
		]);

		const professionPromises = professionIdItem.map((id) =>
			profession_desired_job.create({
				resume_id,
				profession_id: id
			})
		);
		const resumeDesiredJobPromise = resume_desired_job.update(
			{
				...data,
				status: resumeStatusEnum.SUCCESS
			},
			{
				where: {
					resume_id
				}
			}
		);
		const handlePromise = await Promise.all([
			...professionPromises,
			resumeDesiredJobPromise,
			welfareIdItem.map((id) =>
				welfare_desired_job.create({
					resume_id,
					welfare_id: id
				})
			),
			workTypeIdItem.map((id) =>
				resume_work_type.create({
					resume_id,
					work_type_id: id
				})
			)
		]);

		return handlePromise;
	},
	async delete(resume_id) {
		return await findByPkAndDelete(resume_desired_job, resume_id);
	}
};

export default resumeDesiredJobService;
