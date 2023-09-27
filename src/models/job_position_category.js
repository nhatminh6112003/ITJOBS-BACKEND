'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class job_position_category extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			job_position_category.hasMany(models.profession, {
				foreignKey: 'jobPositionCategoryId',
				as: 'profession'
			});
		}
	}
	job_position_category.init(
		{
			id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
			name: DataTypes.STRING
		},
		{
			sequelize,
			tableName: 'job_position_category',
			modelName: 'job_position_category'
		}
	);
	return job_position_category;
};
