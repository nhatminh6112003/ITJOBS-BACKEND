'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class resume_profile extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			resume_profile.belongsTo(models.resume, { foreignKey: 'resume_id', as: 'resume_profile' });
		}
	}
	resume_profile.init(
		{
			resume_id: {
				primaryKey: true ,
				type: DataTypes.UUID
			},
			gender: DataTypes.ENUM('Male', 'Female', 'Other'),
			phone_number: DataTypes.STRING(20),
			marial_status: DataTypes.BOOLEAN,
			birthday: DataTypes.DATEONLY,
			status: DataTypes.BOOLEAN
		},
		{
			sequelize,
			tableName: 'resume_profile',
			modelName: 'resume_profile'
		}
	);
	return resume_profile;
};
