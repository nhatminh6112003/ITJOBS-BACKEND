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
			});
		}
	}
	profession_desired_job.init(
		{
			resume_id: {
				type: DataTypes.UUID,
				primaryKey: true
			},
			profession_id: {
				type: DataTypes.INTEGER,
				primaryKey: true
			}
		},
		{
			sequelize,
			tableName: 'profession_desired_job',
			timestamps: false,
			modelName: 'profession_desired_job'
		}
	);
	return profession_desired_job;
};
