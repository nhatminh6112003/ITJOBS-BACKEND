import { resumeStatusEnum } from '../constants/resumeStatus';
import dotenv from 'dotenv';
import createError from 'http-errors';
import { findOneAndUpdate } from '../helpers/databaseHelpers';
import {
	job_welfare,
	my_attach,
	profession,
	profession_desired_job,
	resume,
	resume_desired_job,
	resume_profile,
	resume_title,
	resume_work_type,
	user_account,
	welfare_desired_job,
	work_type
} from '../models';
import resumeDesiredJobService from './resume_desired_job.service';

dotenv.config();

const myAttachService = {
	async getAllByResume(user_account_id) {
		const findResume = await resume.findAll({
			where: {
				user_account_id,
				resume_type_id: 2,
				isDeleted: false
			},
			include: [
				{ model: my_attach, as: 'attachments' },
				{ model: resume_title, as: 'resume_title' },
				{ model: resume_desired_job, as: 'resume_desired_job' }
			],
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
			include: [
				{ model: user_account, as: 'user_account', include: { model: resume_profile } },
				{ model: my_attach, as: 'attachments', include: { model: resume,as:'resume' } },
				{ model: resume_title, as: 'resume_title' },
				{ model: resume_desired_job, as: 'resume_desired_job' }
			],
			raw: true,
			nest: true
		});

		const resumeWorkType = await resume_work_type.findAll({
			where: {
				resume_id: findResume.id
			},
			include: { model: work_type, as: 'work_type' },
			nest: true,
			raw: true
		});
		const professionDesiredJob = await profession_desired_job.findAll({
			where: {
				resume_id: findResume.id
			},
			include: { model: profession, as: 'profession' },
			nest: true,
			raw: true
		});

		const welfareDesiredJob = await welfare_desired_job.findAll({
			where: {
				resume_id: findResume.id
			},
			nest: true,
			raw: true,
			include: { model: job_welfare, as: 'job_welfare' }
		});
		const welfare_id = welfareDesiredJob?.map((item) => item.welfare_id);
		if (!findResume) throw createError(404, 'Không tìm thấy bản ghi');
		return {
			...findResume,
			resume_work_type: resumeWorkType,
			profession_desired_job: professionDesiredJob,
			welfare_id
		};
	},

	async create(data) {
		const {
			user_account_id,
			resume_active,
			yearOfExperience,
			job_degree_value,
			file,
			title,
			profession_id,
			welfare_id
		} = data;
		const createResume = await resume.create({
			user_account_id,
			resume_type_id: 2,
			resume_active,
			resume_complete: resumeStatusEnum.SUCCESS
		});

		const [createMyAttach, createResumeTitle] = await Promise.all([
			my_attach.create({
				file,
				resume_id: createResume.id,
				yearOfExperience,
				job_degree_value
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
		const { resume_active, file, title, yearOfExperience, job_degree_value, profession_id, welfare_id } = data;
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
					file,
					yearOfExperience,
					job_degree_value
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
