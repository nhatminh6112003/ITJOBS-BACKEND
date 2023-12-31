const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class resume extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// sử dụng belongsTo thì  user_account_id phải nằm trong bảng resume
			resume.belongsTo(models.user_account, {
				foreignKey: 'user_account_id',
				as: 'user_account'
			});
			resume.belongsTo(models.resume_type, {
				foreignKey: 'resume_type_id',
				as: 'resume_type'
			});
			resume.hasOne(models.resume_desired_job, {
				foreignKey: 'resume_id',
				as: 'resume_desired_job'
			});
			resume.hasOne(models.resume_template, {
				foreignKey: 'resume_id',
				as: 'resume_template'
			});
			// resume.hasOne(models.resume_work_type,{
			// 	foreignKey: 'resume_id',
			// 	as: 'resume_work_type'
			// })

			resume.hasMany(models.resume_language, {
				foreignKey: 'resume_id',
				as: 'resume_language'
			});
			resume.hasOne(models.resume_objective, {
				foreignKey: 'resume_id'
			});
			resume.hasMany(models.resume_skill, {
				foreignKey: 'resume_id'
			});
			resume.hasMany(models.resume_refer, {
				foreignKey: 'resume_id',
				as: 'resume_refer'
			});
			resume.hasMany(models.resume_activity, {
				foreignKey: 'resume_id',
			});

			resume.hasOne(models.resume_addioninfo, {
				foreignKey: 'resume_id',
				as: 'resume_addioninfo'
			});
			resume.belongsToMany(models.job_welfare, {
				through: models.welfare_desired_job,
				foreignKey: 'welfare_id',
				otherKey: 'resume_id',
				as: 'job_welfare'
			});
			resume.hasMany(models.profession_desired_job, {
				foreignKey: 'resume_id'
			});
			resume.belongsToMany(models.work_type, {
				through: models.resume_work_type,
				foreignKey: 'resume_id',
				otherKey: 'work_type_id',
				as: 'work_type'
			});

			resume.belongsToMany(models.profession, {
				through: 'profession_desired_job',
				foreignKey: 'resume_id',
				otherKey: 'profession_id'
			});

			resume.hasMany(models.resume_education, {
				foreignKey: 'resume_id',
				as: 'resume_education'
			});
			resume.hasMany(models.resume_certificate, {
				foreignKey: 'resume_id',
				as: 'resume_certificate'
			});
			resume.hasMany(models.job_post_activity, {
				foreignKey: 'resume_id',
				as: 'job_post_activity'
			});
			resume.hasMany(models.my_attach, {
				foreignKey: 'resume_id'
			});
			resume.hasOne(models.resume_title, {
				foreignKey: 'resume_id'
			});
			resume.hasOne(models.resume_profile, {
				foreignKey: 'resume_id'
			});
			resume.hasOne(models.resume_profile, {
				foreignKey: 'resume_id'
			});
			resume.hasMany(models.resume_experience, {
				foreignKey: 'resume_id'
			});
			resume.hasMany(models.employer_resume, {
				foreignKey: 'resume_id'
			});

			resume.hasMany(models.my_attach, { foreignKey: 'resume_id', as: 'attachments' });
		}
	}
	resume.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			user_account_id: DataTypes.UUID,
			resume_type_id: DataTypes.TINYINT,
			resume_active: {
				type: DataTypes.ENUM,
				values: ['1', '2', '3'] // Cung cấp một mảng các giá trị ENUM có thể
			},
			resume_complete: DataTypes.BOOLEAN,
			isDeleted: DataTypes.BOOLEAN
		},
		{
			sequelize,
			tableName: 'resume',
			modelName: 'resume'
		}
	);
	return resume;
};
