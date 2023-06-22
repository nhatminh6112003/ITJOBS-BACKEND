'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class resume_personalinfo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			resume_personalinfo.belongsTo(models.resume, { foreignKey: 'resume_id', as: 'resume_personalinfo' });
		}
	}
	resume_personalinfo.init(
		{
			resume_id: DataTypes.INTEGER,
			firstname: DataTypes.STRING,
			lastname: DataTypes.STRING,
			gender: DataTypes.ENUM('Male', 'Female', 'Other'),
			phone_number: DataTypes.STRING(20),
			marial_status: DataTypes.BOOLEAN,
			birthday: DataTypes.DATE,
			status: DataTypes.BOOLEAN
		},
		{
			sequelize,
			tableName: 'resume_personalinfo',
			modelName: 'resume_personalinfo'
		}
	);
	return resume_personalinfo;
};
