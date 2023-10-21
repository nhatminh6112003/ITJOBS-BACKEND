'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class job_work_type_detail extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			job_work_type_detail.belongsTo(models.work_type, {
				foreignKey: 'id',
				as: 'work_type'
			});
			job_work_type_detail.belongsTo(models.job_post, {
				foreignKey: 'job_id',
				as: 'job_work_type_detail'
			});
		}
	}
	job_work_type_detail.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			work_type_id: DataTypes.INTEGER,
			job_id: DataTypes.UUID
		},
		{
			sequelize,
			modelName: 'job_work_type_detail',
			tableName: 'job_work_type_detail'
		}
	);
	return job_work_type_detail;
};
