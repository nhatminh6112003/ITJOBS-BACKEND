/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('resume_title', {
			resume_id: {
				primaryKey: true,
				type: Sequelize.UUID,
				references: {
					model: 'resume',
					key: 'id'
				}
			},
			title: {
				type: Sequelize.STRING
			},
			status: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('resume_title');
	}
};
