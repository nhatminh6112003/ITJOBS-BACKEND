'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('welfare_desired_job', {
			resume_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				references: {
					model: 'resume',
					key: 'id'
				}
			},
			welfare_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				references: {
					model: 'job_welfare',
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
		await queryInterface.dropTable('welfare_desired_job');
	}
};
