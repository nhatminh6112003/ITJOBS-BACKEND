const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class job_welfare extends Model {
		static associate(models) {
			job_welfare.belongsToMany(models.resume, {
				through: models.welfare_desired_job,
				foreignKey: 'welfare_id',
				otherKey: 'resume_id',
				as: 'resume'
			});
			job_welfare.belongsToMany(models.job_post, {
				through: 'job_welfare_detail',
				foreignKey: 'job_welfare_id', 
				otherKey: 'job_id'
			 });
		}
	}
	job_welfare.init(
		{
			welfare_type: DataTypes.STRING
		},
		{
			sequelize,
			timestamps:false,
			tableName: 'job_welfare',
			modelName: 'job_welfare'
		}
	);
	return job_welfare;
};
