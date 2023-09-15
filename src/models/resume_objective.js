const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class resume_objective extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      resume_objective.belongsTo(models.resume, {
        foreignKey: 'resume_id',
        as: 'resume_objective'
      })
    }
  }
  resume_objective.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    objective_job: DataTypes.STRING,
    resume_id: {
      type: DataTypes.UUID,
    }
  }, {
    sequelize,
    modelName: 'resume_objective',
  });
  return resume_objective;
};