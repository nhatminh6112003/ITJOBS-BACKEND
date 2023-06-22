'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class profession_desired_job extends Model {
		static associate(models) {
			profession_desired_job.belongsTo(models.profession, {
				foreignKey: 'profession_id',
				as: 'profession'
			});
			profession_desired_job.belongsTo(models.resume, {
				foreignKey: 'resume_id',
				as: 'resume'
			});
		}
	}
	profession_desired_job.init(
		{
			resume_id: DataTypes.INTEGER,
			profession_id: DataTypes.INTEGER
		},
		{
			sequelize,
			tableName: 'profession_desired_job',
			modelName: 'profession_desired_job'
		}
	);
	return profession_desired_job;
};
