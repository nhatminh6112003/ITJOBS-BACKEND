'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class job_saved extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			job_saved.belongsTo(models.user_account, {
				foreignKey: 'user_account_id',
				as: 'user_account'
			});

			job_saved.belongsTo(models.job_post, {
				foreignKey: 'job_post',
				as: 'job_post_saved',
			});
		}
	}
	job_saved.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			user_account_id: DataTypes.UUID,
			job_id: DataTypes.UUID
		},
		{
			sequelize,
			modelName: 'job_saved',
			tableName: 'job_saved'
		}
	);
	return job_saved;
};
