'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class job_welfare_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      job_welfare_detail.belongsTo(models.job_welfare, {
        foreignKey: 'job_welfare_id',
        as: 'job_welfare'
      })
      job_welfare_detail.belongsTo(models.job_post, {
				foreignKey: 'job_id',
				as: 'c'
			});
			
      
    }
  }
  job_welfare_detail.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    job_id: DataTypes.UUID,
    job_welfare_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'job_welfare_detail',
    tableName: 'job_welfare_detail'
  });
  return job_welfare_detail;
};