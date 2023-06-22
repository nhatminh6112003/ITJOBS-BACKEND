'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('resume_personalinfo', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			resume_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'resume',
					key: 'id'
				}
			},
			firstname: {
				type: Sequelize.STRING
			},
			lastname: {
				type: Sequelize.STRING
			},
			gender: {
				type: Sequelize.ENUM('Male', 'Female', 'Other')
			},
			phone_number: {
				type: Sequelize.STRING(20)
			},
			marial_status: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			birthday: {
				type: Sequelize.DATE
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
		await queryInterface.dropTable('resume_personalinfo');
	}
};
