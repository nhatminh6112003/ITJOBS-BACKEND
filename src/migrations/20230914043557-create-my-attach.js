'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('my_attach', {
			id: {
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				type: Sequelize.UUID
			},
			yearOfExperience: {
				type: Sequelize.INTEGER
			},
			job_degree_value: {
				type: Sequelize.INTEGER
			},
			resume_id: {
				type: Sequelize.UUID,
				references: {
					model: 'resume',
					key: 'id'
				}
			},
			file: {
				type: Sequelize.STRING
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
		await queryInterface.dropTable('my_attach');
	}
};
