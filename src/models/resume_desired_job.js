'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class resume_desired_job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  resume_desired_job.init({
    resume_id: DataTypes.INTEGER,
    salary_from: DataTypes.STRING,
    salary_to: DataTypes.STRING,
    position_id: DataTypes.INTEGER,
    provinces: DataTypes.INTEGER,
    districts: DataTypes.INTEGER,
    work_home: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName:'resume_desired_job',
    modelName: 'resume_desired_job',
  });
  return resume_desired_job;
};