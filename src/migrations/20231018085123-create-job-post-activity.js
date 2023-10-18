'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('job_post_activity', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			user_account_id: {
				type: Sequelize.UUID,
				references: {
					model: 'user_account',
					key: 'id'
				}
			},
			job_id: {
				type: Sequelize.UUID
			},
			resume_id: {
				type: Sequelize.UUID,
				references: {
					model: 'resume',
					key: 'id'
				}
			},
			apply_date: {
				type: Sequelize.DATE
			},
			status: {
				type: Sequelize.BOOLEAN
			},
			resume_type: {
				type: Sequelize.INTEGER
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
		await queryInterface.dropTable('job_post_activity');
	}
};
