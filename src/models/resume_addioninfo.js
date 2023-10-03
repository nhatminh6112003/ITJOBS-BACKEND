'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class resume_addioninfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      resume_addioninfo.belongsTo(models.resume, {
				foreignKey: 'resume_id',
				as: 'resume'
			});
    }
  }
  resume_addioninfo.init({
    resume_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    addioninfo: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'resume_addioninfo',
    tableName: 'resume_addioninfo'
  });
  return resume_addioninfo;
};