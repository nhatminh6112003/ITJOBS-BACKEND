'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class benefits extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			benefits.belongsToMany(models.service, {
				through: 'service_benefits',
				foreignKey: 'benefit_id',
				otherKey: 'service_id'
			});
		}
	}
	benefits.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			name: DataTypes.STRING,
			description: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'benefits'
		}
	);
	return benefits;
};
