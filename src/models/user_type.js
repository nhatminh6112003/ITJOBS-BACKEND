'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class user_type extends Model {
		static associate(models) {
			// 1 loại người dùng có thể liên kết với nhiều account khác nhau
			user_type.belongsTo(models.user_account, { foreignKey: 'user_type_id', as: 'user_type' });
		}
	}
	user_type.init(
		{
			name: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'user_type'
		}
	);
	return user_type;
};
