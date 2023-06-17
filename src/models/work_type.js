'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class work_type extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	work_type.init(
		{
			name: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'work_type',
			tableName: 'work_type'
		}
	);
	return work_type;
};
