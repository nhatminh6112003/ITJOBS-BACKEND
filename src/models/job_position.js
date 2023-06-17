'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class job_position extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
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
