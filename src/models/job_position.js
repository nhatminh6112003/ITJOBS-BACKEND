const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class job_position extends Model {
		static associate(models) {}
	}
	job_position.init(
		{
			position: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'job_position',
			tableName: 'job_position'
		}
	);
	return job_position;
};
