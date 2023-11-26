'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class company_service extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			company_service.belongsTo(models.service, {
				foreignKey: 'service_id'
			});
		}
	}
	company_service.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			company_id: DataTypes.UUID,
			user_account_id: DataTypes.UUID,
			service_id: DataTypes.UUID,
			expiration_date: DataTypes.DATE,
			register_date: DataTypes.DATE
		},
		{
			sequelize,
			modelName: 'company_service',
			tableName: 'company_service'
		}
	);
	return company_service;
};
