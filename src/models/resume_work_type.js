'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class resume_work_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      resume_work_type.belongsTo(models.work_type, {
				foreignKey: 'id',
				as: 'work_type'
			});
			resume_work_type.belongsTo(models.resume, {
				foreignKey: 'resume_id',
				as: 'resume'
			});
    }
  }
  resume_work_type.init({
    work_type_id: DataTypes.INTEGER,
  	resume_id:DataTypes.UUID
  }, {
    sequelize,
    tableName:'resume_work_type',
    modelName: 'resume_work_type',
  });
  return resume_work_type;
};