'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class resume_skill extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			resume_skill.belongsTo(models.resume, { foreignKey: 'resume_id', as: 'resume_skill' });
		}
	}
	resume_skill.init(
		{
			resume_id: {
				primaryKey:true,
				type:DataTypes.INTEGER
			},
			skill_name: DataTypes.STRING,
			skill_content: DataTypes.STRING,
			skill_level: DataTypes.STRING,
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
