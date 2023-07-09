'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cv_template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cv_template.hasMany(models.resume_template, {
				foreignKey: 'cv_template_id',
				as: 'resume_template'
			});
    }
  }
  cv_template.init({
    default_color: DataTypes.STRING,
    default_font: DataTypes.STRING,
    default_size: DataTypes.STRING,
    default_template_name: DataTypes.STRING,
    default_template_color: DataTypes.STRING,
    default_template: DataTypes.STRING,
    color_pick: DataTypes.TEXT,
    html_template_en: DataTypes.TEXT,
    html_template_vi: DataTypes.TEXT
  }, {
    sequelize,
    tableName:'cv_template',
    modelName: 'cv_template',
  });
  return cv_template;
};