'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class my_attach extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      my_attach.belongsTo(models.resume, { foreignKey: 'resume_id', as: 'resume' });
    }
  }
  my_attach.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    file: DataTypes.STRING,
    resume_id: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'my_attach',
    tableName:"my_attach"
  });
  return my_attach;
};