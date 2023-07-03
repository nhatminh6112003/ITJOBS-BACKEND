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
				as: 'resume'
			});
			resume.belongsTo(models.resume_type, {
				foreignKey: 'resume_type_id',
				as: 'resume_type'
			});
			resume.hasOne(models.resume_desired_job, {
				foreignKey: 'resume_id',
				as: 'resume_desired_job'
			});
			resume.hasMany(models.resume_language, {
				foreignKey: 'resume_id',
				as: 'resume_language'
			});
			resume.hasMany(models.resume_skill, {
				foreignKey: 'resume_id',
				as: 'resume_skill'
			});
			resume.hasOne(models.resume_profile, {
				foreignKey: 'resume_id',
				as: 'resume_profile'
			});
			resume.hasOne(models.resume_title, {
				foreignKey: 'resume_id',
				as: 'resume_title'
			});
			resume.belongsToMany(models.job_welfare, {
				through: models.welfare_desired_job,
				foreignKey: 'welfare_id',
				otherKey: 'resume_id',
				as: 'job_welfare'
			});
			resume.belongsToMany(models.profession, {
				through: models.profession_desired_job,
				foreignKey: 'profession_id',
				otherKey: 'resume_id',
				as: 'profession'
			});
			resume.hasMany(models.resume_education, {
				foreignKey: 'resume_id',
				as: 'resume_education'
			});
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
