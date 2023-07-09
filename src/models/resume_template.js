'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class resume_template extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			resume_template.belongsTo(models.resume, {
				foreignKey: 'resume_id',
				as: 'resume'
			});
			resume_template.belongsTo(models.cv_template, {
				foreignKey: 'cv_template_id',
				as: 'cvTemplate'
			});
		}
	}
	resume_template.init(
		{
			resume_id: DataTypes.UUID,
			cv_color: DataTypes.STRING,
			cv_font: DataTypes.STRING,
			cv_font_color: DataTypes.STRING,
			cv_language: DataTypes.STRING,
			cv_size: DataTypes.STRING,
			cv_template_id: DataTypes.INTEGER,
			default_color: DataTypes.STRING,
			default_font: DataTypes.STRING,
			default_size: DataTypes.STRING,
			default_template_name: DataTypes.STRING,
			default_template_color: DataTypes.STRING,
			default_template: DataTypes.STRING,
		},
		{
			sequelize,
			tableName: 'resume_template',
			modelName: 'resume_template'
		}
	);
	return resume_template;
};
