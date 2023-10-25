'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class job_post_activity extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			job_post_activity.belongsTo(models.resume, {
				foreignKey: 'resume_id',
				as: 'resume'
			});
			job_post_activity.belongsTo(models.user_account, {
				foreignKey: 'user_account_id',
				as: 'user_account'
			});
			job_post_activity.belongsTo(models.job_post, {
				foreignKey: 'job_id',
			});
		}
	}
	job_post_activity.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			user_account_id: DataTypes.UUID,
			job_id: DataTypes.UUID,
			resume_id: DataTypes.UUID,
			apply_date: DataTypes.DATE,
			status: DataTypes.BOOLEAN,
			resume_type: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'job_post_activity',
			tableName: 'job_post_activity'
		}
	);
	return job_post_activity;
};
