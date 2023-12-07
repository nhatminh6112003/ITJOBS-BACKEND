'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service_benefits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  service_benefits.init({
    service_id: DataTypes.UUID,
    benefit_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'service_benefits',
  });
  return service_benefits;
};