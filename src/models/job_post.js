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
				foreignKey: 'company_id'
			});
			job_post.belongsTo(models.user_account, {
				foreignKey: 'posted_by_id',
				as: 'user_account'
			});
			// job_post.hasMany(models.job_welfare_detail, {
			// 	foreignKey: 'job_id',
			// 	as: 'job_welfare_detail'
			// });
			// job_post.belongsToMany(models.profession, {
			// 	through: 'job_profession_detail',
			// });

			// job_post.hasMany(models.job_work_type_detail, {
			// 	foreignKey: 'job_id',
			// 	as: 'job_work_type_detail'
			// });
			job_post.belongsToMany(models.job_welfare, {
				through: 'job_welfare_detail',
				foreignKey: 'job_id',
				otherKey: 'job_welfare_id'
			});
			job_post.belongsToMany(models.profession, {
				through: 'job_profession_detail',
				foreignKey: 'job_id',
				otherKey: 'profession_id',
				as: 'profession'
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
			gender: DataTypes.TINYINT,
			is_address_work_hidden: DataTypes.BOOLEAN,
			min_salary: DataTypes.INTEGER,
			max_salary: DataTypes.INTEGER,
			expiry_date: DataTypes.DATE,
			posted_date: DataTypes.DATE,
			job_desc: DataTypes.TEXT,
			job_request: DataTypes.TEXT,
			status: DataTypes.TINYINT,
			work_home: DataTypes.BOOLEAN,
			isDeleted: DataTypes.BOOLEAN,
			provinces: DataTypes.INTEGER,
			districts: DataTypes.INTEGER,
			job_formExperience: DataTypes.INTEGER,
			job_ToExperience: DataTypes.INTEGER,
			isAgreement: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: 'job_post',
			tableName: 'job_post'
		}
	);
	return job_post;
};
