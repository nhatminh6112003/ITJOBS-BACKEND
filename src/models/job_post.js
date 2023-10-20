'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class job_post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			job_post.belongsTo(models.company, {
				foreignKey: 'company_id',
				as: 'company'
			});
			job_post.belongsTo(models.user_account, {
				foreignKey: 'posted_by_id',
				as: 'user_account'
			});
		}
	}
	job_post.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			posted_by_id: DataTypes.UUID,
			company_id: DataTypes.UUID,
			job_degree_value: DataTypes.INTEGER,
			job_position_value: DataTypes.INTEGER,
			job_experience_value: DataTypes.TINYINT,
			address: DataTypes.STRING,
			form_age: DataTypes.STRING,
			to_age: DataTypes.STRING,
			job_title: DataTypes.STRING,
			gender: {
				type: DataTypes.ENUM('0', '1', '2')
			},
			is_address_work_hidden: DataTypes.BOOLEAN,
			min_salary: DataTypes.INTEGER,
			max_salary: DataTypes.INTEGER,
			posted_date: DataTypes.DATE,
			job_desc: DataTypes.TEXT,
			job_request: DataTypes.TEXT,
			status: {
				type: DataTypes.ENUM('0', '1', '2')
			},
			work_home: DataTypes.BOOLEAN,
			isDeleted: DataTypes.BOOLEAN,
			job_formExperience: DataTypes.INTEGER,
			job_ToExperience: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'job_post',
			tableName: 'job_post'
		}
	);
	return job_post;
};
