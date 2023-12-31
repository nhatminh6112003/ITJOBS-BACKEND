const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class resume_language extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			resume_language.belongsTo(models.resume, {
				foreignKey: 'resume_id',
				as: 'resume_language'
			});
		}
	}
	resume_language.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			resume_id: {
				type: DataTypes.UUID
			},
			rs_language: {
				type: DataTypes.ENUM('vn', 'en', 'fr', 'de', 'ru', 'cn', 'kr', 'jp', 'other')
			},
			rs_language_level: {
				type: DataTypes.ENUM('1', '2', '3', '4', '5')
			},
			rs_language_certify: DataTypes.STRING
		},
		{
			sequelize,
			tableName: 'resume_language',
			modelName: 'resume_language'
		}
	);
	return resume_language;
};
