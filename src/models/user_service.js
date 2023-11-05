'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class user_service extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	user_service.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			user_account_id: DataTypes.UUID,
			service_id: DataTypes.UUID,
			expiration_date: DataTypes.DATE,
			register_date: DataTypes.DATE
		},
		{
			sequelize,
			modelName: 'user_service',
			tableName: 'user_service'
		}
	);
	return user_service;
};
