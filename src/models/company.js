'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class company extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			company.belongsTo(models.user_account, {
				foreignKey: 'user_account_id',
				as: 'user_account'
			});

			company.hasMany(models.job_post, {
				foreignKey: 'company_id',
				as: 'job_post'
			});
			company.hasMany(models.order, {
				foreignKey: 'company_id'
			});
		}
	}
	company.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			user_account_id: DataTypes.UUID,
			company_name: DataTypes.STRING,
			company_type: DataTypes.INTEGER,
			company_size: DataTypes.STRING,
			logo: DataTypes.STRING,
			provinces: DataTypes.INTEGER,
			company_website_url: DataTypes.STRING,
			banner: DataTypes.STRING,
			company_summary: DataTypes.TEXT,
			tax_code: DataTypes.STRING,
			address: DataTypes.STRING,
			contact_name: DataTypes.STRING,
			contact_phone: DataTypes.STRING,
			position: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'company',
			tableName: 'company'
		}
	);
	return company;
};
