import createError from 'http-errors';
import { resume, my_attach, sequelize, resume_title } from '@src/models';
import { findOneAndUpdate } from '@src/helpers/databaseHelpers';
import dotenv from 'dotenv';
import { resumeStatusEnum } from '@src/constants/resumeStatus';
import resumeDesiredJobService from './resume_desired_job.service';

dotenv.config();

const myAttachService = {
	async getAllByResume(user_account_id) {
		console.log('TCL: getAllByResume -> user_account_id', user_account_id);
		const findResume = await resume.findAll({
			where: {
				user_account_id
			},
			include: [{ model: my_attach, as: 'attachments' }],
			nest: true,
			raw: true
		});
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},
	async getOne(id) {
		const findResume = await resume.findOne({
			where: {
				id
			},
			include: [{ model: my_attach, as: 'attachments' }],
			raw: true,
			nest: true
		});
		console.log('TCL: getOne -> findResume', findResume);

		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return findResume;
	},

	async create(data) {
		const { user_account_id, resume_active, file, title, profession_id, welfare_id } = data;
		const createResume = await resume.create({
			user_account_id,
			resume_type_id: 2,
			resume_active,
			resume_complete: resumeStatusEnum.SUCCESS
		});
		console.log('TCL: create -> createResume', createResume.id);

		const [createMyAttach, createResumeTitle] = await Promise.all([
			my_attach.create({
				file,
				resume_id: createResume.id
			}),
			resume_title.create({
				resume_id: createResume.id,
				title
			})
		]);

		const createResumeDesiredJob = await resumeDesiredJobService.create({
			resume_id: createResume.id,
			position_id: data.position_id,
			profession_id,
			salary_from: data.salary_from,
			salary_to: data.salary_to,
			work_type_id: data.work_type_id,
			work_home: data.work_home,
			provinces: data.provinces,
			districts: data.districts,
			welfare_id
		});

		return [createMyAttach, createResumeTitle, createResumeDesiredJob];
	},

	async update(resume_id, data) {
		const { resume_active, file, title, profession_id, welfare_id } = data;
		const updateResume = await resume.update(
			{
				resume_active
			},
			{
				where: {
					id: resume_id
				}
			}
		);

		const [updateMyAttach, updateResumeTitle] = await Promise.all([
			my_attach.update(
				{
					file
				},
				{
					where: {
						resume_id
					}
				}
			),
			resume_title.update(
				{
					title
				},
				{
					where: {
						resume_id
					}
				}
			)
		]);

		const updateResumeDesiredJob = await resumeDesiredJobService.update(resume_id, {
			position_id: data.position_id,
			profession_id,
			salary_from: data.salary_from,
			salary_to: data.salary_to,
			work_type_id: data.work_type_id,
			work_home: data.work_home,
			provinces: data.provinces,
			districts: data.districts,
			welfare_id
		});

		return [updateResume, updateMyAttach, updateResumeTitle, updateResumeDesiredJob];
	},

	async delete(id) {
		return await findOneAndUpdate(resume, { id }, { isDeleted: true });
	}
};

export default myAttachService;
