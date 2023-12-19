'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class employer_resume extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			employer_resume.belongsTo(models.resume, {
				foreignKey: 'resume_id'
			});
			employer_resume.belongsTo(models.user_account, {
				foreignKey: 'user_account_id'
			});
		}
	}
	employer_resume.init(
		{
			id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
			user_account_id: DataTypes.STRING,
			resume_id: DataTypes.STRING
		},
		{
			sequelize,
			tableName: 'employer_resume',
			modelName: 'employer_resume'
		}
	);
	return employer_resume;
};
