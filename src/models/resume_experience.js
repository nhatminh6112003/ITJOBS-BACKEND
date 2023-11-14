'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class resume_experience extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			resume_experience.belongsTo(models.resume, {
				foreignKey: 'resume_id',
			});
		
		}
	}
	resume_experience.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			resume_id: DataTypes.UUID,
			rexp_worktype_id: DataTypes.INTEGER,
			rexp_title: DataTypes.STRING,
			rexp_company: DataTypes.STRING,
			rexp_workdesc: DataTypes.STRING,
			rexp_form: DataTypes.DATE,
			rexp_to: DataTypes.DATE,
			experCurrent: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: 'resume_experience',
			tableName: 'resume_experience'
		}
	);
	return resume_experience;
};
