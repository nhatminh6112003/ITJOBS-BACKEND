/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('resume_certificate', {
			id: {
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				type: Sequelize.UUID
			},
			resume_id: {
				type: Sequelize.UUID,
				references: {
					model: 'resume',
					key: 'id'
				}
			},
			cer_by: {
				type: Sequelize.STRING
			},
			cer_form: {
				type: Sequelize.DATE
			},
			cer_to: {
				type: Sequelize.DATE
			},
			cer_limit: {
				type: Sequelize.BOOLEAN
			},
			cer_title: {
				type: Sequelize.STRING
			},
			status: {
				type: Sequelize.BOOLEAN
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
		await queryInterface.dropTable('resume_certificate');
	}
};
