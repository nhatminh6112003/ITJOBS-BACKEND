const { Model } = require('sequelize');
// const job_post = require('./job_post');

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
			profession.belongsTo(models.job_position_category, {
				foreignKey: 'jobPositionCategoryId',
				as: 'job_position_category'
			});
			// profession.belongsToMany(models.job_post, {
			// 	through: 'job_profession_detail',
			// });
			profession.belongsToMany(models.job_post, {
				through: 'job_profession_detail',
				as: 'job_post',
				foreignKey: 'profession_id',
				otherKey: 'job_id'
			});
			profession.belongsToMany(models.resume, {
				through: 'profession_desired_job',
				foreignKey: 'profession_id',
				otherKey: 'resume_id'
			});
		}
	}
	profession.init(
		{
			name: DataTypes.STRING,
			jobPositionCategoryId: {
				type: DataTypes.UUID
			}
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
