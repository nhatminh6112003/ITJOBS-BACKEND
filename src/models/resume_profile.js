const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class resume_profile extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			resume_profile.belongsTo(models.resume, {
				foreignKey: 'resume_id',
			});
			resume_profile.belongsTo(models.user_account,{
				foreignKey: 'user_account_id',
				as: 'user_account'
			 })
		}
	}
	resume_profile.init(
		{
			resume_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			user_account_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			gender: DataTypes.ENUM('Male', 'Female', 'Other'),
			phone_number: DataTypes.STRING(20),
			marial_status: DataTypes.BOOLEAN,
			birthday: DataTypes.DATE,
			provinces: DataTypes.INTEGER,
			districts: DataTypes.INTEGER,
			address:DataTypes.STRING,
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
