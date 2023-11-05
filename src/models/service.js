'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class service extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	service.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			service_type_id: DataTypes.UUID,
			price_list: DataTypes.UUID,
			description: DataTypes.STRING,
			name: DataTypes.STRING,
			benefits_id: DataTypes.UUID
		},
		{
			sequelize,
			modelName: 'service',
			tableName: 'service'
		}
	);
	return service;
};
