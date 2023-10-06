import createError from 'http-errors';
import { resume_desired_job, profession_desired_job, welfare_desired_job, resume_work_type } from '@src/models';
import { findByPkAndDelete, findByPkAndUpdate } from '@src/helpers/databaseHelpers';
import { resumeStatusEnum } from '@src/constants/resumeStatus';
import dotenv from 'dotenv';

dotenv.config();

const resumeDesiredJobService = {
	async getOne(resume_id) {
		const findResume = await resume_desired_job.findOne({
			where: {
				resume_id
			},
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},
	async create({ profession_id, ...data }) {
		const professionPromises = profession_id.map((id) =>
			profession_desired_job.create({
				resume_id: data.resume_id,
				profession_id: id
			})
		);

		const resumeDesiredJobPromise = resume_desired_job.create({
			...data,
			status: resumeStatusEnum.SUCCESS
		});
		const handlePromise = await Promise.all([...professionPromises, resumeDesiredJobPromise]);

		return handlePromise;
	},
	async update(resume_id,{ welfare_id, work_type_id, profession_id, ...data }) {
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

		const professionPromises = profession_id.map((id) =>
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
			welfare_id.map((id) =>
				welfare_desired_job.create({
					resume_id,
					welfare_id: id
				})
			),
			work_type_id.map((id) =>
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
