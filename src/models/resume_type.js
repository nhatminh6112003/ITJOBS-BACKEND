'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class resume_type extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// 1 loại hồ sơ thì có thể liên kết với nhiều hồ sơ
			resume_type.hasMany(models.resume, { foreignKey: 'resume_type_id', as: 'resume_type' });
		}
	}
	resume_type.init(
		{
			resume_type_name: DataTypes.STRING
		},
		{
			sequelize,
			tableName: 'resume_type',
			modelName: 'resume_type'
		}
	);
	return resume_type;
};
