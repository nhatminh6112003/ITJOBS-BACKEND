'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class user_account extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			user_account.belongsTo(models.user_type, { foreignKey: 'user_type_id', as: 'user_type' });
			user_account.hasMany(models.resume, { foreignKey: 'user_account_id', as: 'resume' });
		}
	}
	user_account.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			user_type_id: DataTypes.INTEGER,
			email: DataTypes.STRING,
			password: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'user_account',
			tableName: 'user_account'
		}
	);
	return user_account;
};
