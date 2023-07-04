const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class resume_certificate extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			resume_certificate.belongsTo(models.resume, {
				foreignKey: 'resume_id',
				as: 'resume_certificate'
			});
		}
	}
	resume_certificate.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			resume_id: DataTypes.UUID,
			cer_by: DataTypes.STRING,
			cer_form: DataTypes.DATE,
			cer_to: DataTypes.DATE,
			cer_limit: DataTypes.BOOLEAN,
			cer_title: DataTypes.STRING,
			status: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: 'resume_certificate',
			tableName: 'resume_certificate'
		}
	);
	return resume_certificate;
};
