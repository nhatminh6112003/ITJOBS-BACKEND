'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class feedback extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	feedback.init(
		{
			email: DataTypes.STRING,
			reason: DataTypes.INTEGER,
			job_url: DataTypes.STRING
		},
		{
			sequelize,
			tableName: 'feedback',
			modelName: 'feedback'
		}
	);
	return feedback;
};
