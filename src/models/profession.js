const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class profession extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			profession.belongsToMany(models.resume, {
				through: models.profession_desired_job,
				foreignKey: 'profession_id',
				otherKey: 'resume_id',
				as: 'resumes'
			});
		}
	}
	profession.init(
		{
			name: DataTypes.STRING
		},
		{
			sequelize,
			tableName: 'profession',
			timestamps: false,
			modelName: 'profession'
		}
	);
	return profession;
};
