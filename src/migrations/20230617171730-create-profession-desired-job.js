/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('profession_desired_job', {
			resume_id: {
				primaryKey: true,
				type: Sequelize.UUID,
				references: {
					model: 'resume',
					key: 'id'
				}
			},
			profession_id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				references: {
					model: 'profession',
					key: 'id'
				}
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('profession_desired_job');
	}
};
