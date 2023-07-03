const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class resume_education extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			resume_education.belongsTo(models.resume, {
				foreignKey: 'resume_id',
				as: 'resume_education'
			});
		}
	}
	resume_education.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			resume_id: DataTypes.UUID,
			redu_name: DataTypes.STRING,
			redu_degree: {
				type: DataTypes.ENUM('0', '1', '2', '3', '4', '5', '6')
			},
			redu_date: DataTypes.DATE,
			redu_desc: DataTypes.STRING,
			status: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: 'resume_education',
			tableName: 'resume_education'
		}
	);
	return resume_education;
};
