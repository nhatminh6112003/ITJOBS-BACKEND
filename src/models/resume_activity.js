'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class resume_activity extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			resume_activity.belongsTo(models.resume, {
				foreignKey: 'resume_id',
				as: 'resume_activity'
			});
		}
	}
	resume_activity.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			resume_id: DataTypes.UUID,
			organization: DataTypes.STRING,
			role: DataTypes.STRING,
			start_date: DataTypes.DATE,
			end_date: DataTypes.DATE,
			activity_des: DataTypes.TEXT,
			activity_current: DataTypes.BOOLEAN,
			status: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: 'resume_activity',
			tableName: 'resume_activity'
		}
	);
	return resume_activity;
};
