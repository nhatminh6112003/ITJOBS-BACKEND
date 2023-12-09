'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class service_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    	service_type.hasMany(models.service, {
				foreignKey: 'service_type_id'
			});
   
    }
  }
  service_type.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'service_type',
    tableName: 'service_type',
  });
  return service_type;
};