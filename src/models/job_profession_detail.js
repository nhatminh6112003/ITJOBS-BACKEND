'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class job_profession_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      job_profession_detail.belongsTo(models.profession, {
        foreignKey: 'profession_id',
        as: 'profession',
      })
    }
  }
  job_profession_detail.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    profession_id: DataTypes.UUID,
    job_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'job_profession_detail',
    tableName: 'job_profession_detail',
  });
  return job_profession_detail;
};