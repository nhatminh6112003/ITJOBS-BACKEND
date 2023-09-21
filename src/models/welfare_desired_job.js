const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class welfare_desired_job extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			welfare_desired_job.belongsTo(models.job_welfare, {
				foreignKey: 'welfare_id',
				as: 'job_welfare'
			});
			welfare_desired_job.belongsTo(models.resume, {
				foreignKey: 'resume_id',
				as: 'resume'
			});
		}
	}
	welfare_desired_job.init(
		{
			resume_id: {
				type: DataTypes.UUID,
				primaryKey: true
			},
			welfare_id: {
				type: DataTypes.INTEGER,
				primaryKey: true
			}
		},
		{
			sequelize,
			timestamps: false,
			tableName: 'welfare_desired_job',
			modelName: 'welfare_desired_job'
		}
	);
	return welfare_desired_job;
};
