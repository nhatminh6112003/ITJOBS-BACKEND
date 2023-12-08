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
			service.belongsTo(models.service_type, {
				foreignKey: 'service_type_id'
			});
			service.hasMany(models.company_service, {
				foreignKey: 'service_id'
			});
			service.belongsToMany(models.benefits, {
				through: 'service_benefits',
				foreignKey: 'service_id',
				otherKey: 'benefit_id'
			});
		}
	}
	service.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			name: DataTypes.STRING,
			price: DataTypes.INTEGER,
			description: DataTypes.STRING,
			slug: DataTypes.STRING,
			service_type_id: DataTypes.UUID
		},
		{
			sequelize,
			modelName: 'service',
			tableName: 'service'
		}
	);
	return service;
};
