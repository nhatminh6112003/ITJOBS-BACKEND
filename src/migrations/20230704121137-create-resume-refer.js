/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('resume_refer', {
			id: {
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				type: Sequelize.UUID
			},
			resume_id: {
				primaryKey: true,
				type: Sequelize.UUID,
				references: {
					model: 'resume',
					key: 'id'
				}
			},
			ref_name: {
				type: Sequelize.STRING
			},
			ref_title: {
				type: Sequelize.STRING
			},
			ref_company: {
				type: Sequelize.STRING
			},
			ref_phone: {
				type: Sequelize.STRING
			},
			ref_email: {
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
		await queryInterface.dropTable('resume_refer');
	}
};
