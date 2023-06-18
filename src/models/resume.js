'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class resume extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			resume.hasMany(models.user_account, { foreignKey: 'user_account_id', as: 'resume' });
			resume.hasMany(models.resume_type, { foreignKey: 'resume_type_id', as: 'resume_type' });
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
		}
	}
	resume.init(
		{
			user_account_id: DataTypes.INTEGER,
			resume_type_id: DataTypes.INTEGER,
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
