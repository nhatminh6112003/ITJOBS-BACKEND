'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class order extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			order.belongsTo(models.company, {
				foreignKey: 'company_id',
			});
		}
	}
	order.init(
		{
			total: DataTypes.INTEGER,
			company_id: DataTypes.UUID,
			status: DataTypes.STRING
		},
		{
			sequelize,
			tableName: 'order',
			modelName: 'order'
		}
	);
	return order;
};
