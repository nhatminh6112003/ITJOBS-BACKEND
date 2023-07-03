const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class resume_title extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			resume_title.belongsTo(models.resume, {
				foreignKey: 'resume_id',
				as: 'resume'
			});
		}
	}
	resume_title.init(
		{
			resume_id: {
				type: DataTypes.UUID,
				primaryKey: true
			},
			title: DataTypes.STRING,
			status: DataTypes.BOOLEAN
		},
		{
			sequelize,
			tableName: 'resume_title',
			modelName: 'resume_title'
		}
	);
	return resume_title;
};
