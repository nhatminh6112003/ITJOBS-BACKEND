/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('profession_desired_job', {
			resume_id: {
				type: Sequelize.UUID,
				primaryKey: true,
				references: {
					model: 'resume',
					key: 'id'
				}
			},
			profession_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				references: {
					model: 'profession',
					key: 'id'
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('profession_desired_job');
	}
};
