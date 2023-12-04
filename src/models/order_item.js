'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order_item.init({
    order_id: DataTypes.UUID,
    service_id: DataTypes.UUID,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_item',
  });
  return order_item;
};