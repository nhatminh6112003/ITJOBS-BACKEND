'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class resume_refer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    	// define association here
			resume_refer.belongsTo(models.resume, {
				foreignKey: 'resume_id',
				as: 'resume_refer'
			});
    }
  }
  resume_refer.init({
    resume_id: DataTypes.UUID,
    ref_name: DataTypes.STRING,
    ref_title: DataTypes.STRING,
    ref_company: DataTypes.STRING,
    ref_phone: DataTypes.STRING,
    ref_email: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName:'resume_refer',
    modelName: 'resume_refer',
  });
  return resume_refer;
};