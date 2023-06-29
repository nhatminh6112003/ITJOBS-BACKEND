'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class user_type extends Model {
		static associate(models) {
			user_type.hasMany(models.user_account, { foreignKey: 'user_type_id', as: 'user_type' });
		}
	}
	user_type.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			name: DataTypes.STRING
		},
		{
			sequelize,
			tableName: 'user_type',
			modelName: 'user_type'
		}
	);
	return user_type;
};
