const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class work_type extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			work_type.belongsToMany(models.resume, {
				through: models.resume_work_type,
				foreignKey: 'work_type_id',
				otherKey: 'resume_id',
				as: 'work_type_resume'
			});
		}
	}
	work_type.init(
		{
		name: DataTypes.STRING
		},
		{
			sequelize,
			timestamps: false,
			modelName: 'work_type',
			tableName: 'work_type'
		}
	);
	return work_type;
};
