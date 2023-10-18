import { Router } from 'express';
import AuthRoutes from './auth.route.js';
import JobPositionCategoryRoutes from './job_position_category.route.js';
import JobWelfareRoutes from './job_welfare.route.js';
import ProfessionRoutes from './profession.route.js';
import UserRoutes from './users.route.js';
import cvTemplateRoutes from './cv_template.route.js';
import myAttachRoutes from './my_attach.route.js';
import resumeActivityRoutes from './resume_activity.route.js';
import resumeCertificateRoutes from './resume_certificate.route.js';
import resumeDesiredJobRoutes from './resume_desired_job.route';
import resumeEducationRoutes from './resume_education.route.js';
import resumeLanguageRoutes from './resume_language.route';
import resumeObjectiveRoutes from './resume_objective.route.js';
import resumeReferRoutes from './resume_refer.route.js';
import resumeRoutes from './resume.route.js';
import resumeSkillRoutes from './resume_skill.route.js';
import resumeTemplateRoutes from './resume_template.route';
import resumeTitleRoutes from './resume_title.route';
import resumeWorkTypeRoutes from './resume_work_type.route';
import resumeAddioninfoRoutes from "./resume_addioninfo.route.js"
import resumeExperienceRoutes from './resume_experience.route.js';
import workTypeRoutes from './work_type.route.js';
import companyRoutes from './company.route.js';
import jobProfessionDetailRoutes from './job_profession_detail.route.js';
import jobWelfareDetailRoutes from './job_welfare_detail.route.js'

function route(app) {
	const apiRoutes = Router();
	apiRoutes.use('/users', UserRoutes);
	apiRoutes.use('/auth', AuthRoutes);
	apiRoutes.use('/job_position_category', JobPositionCategoryRoutes);
	apiRoutes.use('/job_welfare', JobWelfareRoutes);
	apiRoutes.use('/profession', ProfessionRoutes);
	apiRoutes.use('/cv_template', cvTemplateRoutes);
	apiRoutes.use('/work_type', workTypeRoutes);
	apiRoutes.use('/resume', resumeRoutes);
	apiRoutes.use('/resume_title', resumeTitleRoutes);
	apiRoutes.use('/resume_language', resumeLanguageRoutes);
	apiRoutes.use('/resume_skill', resumeSkillRoutes);
	apiRoutes.use('/resume_education', resumeEducationRoutes);
	apiRoutes.use('/resume_certificate', resumeCertificateRoutes);
	apiRoutes.use('/resume_refer', resumeReferRoutes);
	apiRoutes.use('/resume_template', resumeTemplateRoutes);
	apiRoutes.use('/resume_desired_job', resumeDesiredJobRoutes);
	apiRoutes.use('/resume_objective', resumeObjectiveRoutes);
	apiRoutes.use('/resume_work_type', resumeWorkTypeRoutes);
	apiRoutes.use('/resume_activity', resumeActivityRoutes);
	apiRoutes.use('/resume_experience', resumeExperienceRoutes);
	apiRoutes.use('/my_attach', myAttachRoutes);
	apiRoutes.use('/resume_addioninfo', resumeAddioninfoRoutes);
	apiRoutes.use('/company', companyRoutes)
	apiRoutes.use('/job_profession_detail',jobProfessionDetailRoutes)
	apiRoutes.use('/job_welfare_detail',jobWelfareDetailRoutes)

	app.use('/api', apiRoutes);
}
export default route;
