// eslint-disable-next-line import/no-extraneous-dependencies, import/no-import-module-exports

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class resume_skill extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			resume_skill.belongsTo(models.resume, {
				foreignKey: 'resume_id',
				as: 'resume_skill'
			});
		}
	}
	resume_skill.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			resume_id: DataTypes.UUID,
			skill_name: DataTypes.STRING,
			skill_content: DataTypes.STRING,
			skill_level: {
				type: DataTypes.ENUM('0', '1', '2', '3', '4', '5')
			},
			status: DataTypes.BOOLEAN
		},
		{
			sequelize,
			tableName: 'resume_skill',
			modelName: 'resume_skill'
		}
	);
	return resume_skill;
};
