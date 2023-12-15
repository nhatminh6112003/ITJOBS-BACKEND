'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('company_service', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			company_id: {
				type: Sequelize.UUID
			},
			user_account_id: {
				type: Sequelize.UUID
			},
			service_id: {
				type: Sequelize.UUID
			},
			quantity: {
				type: Sequelize.INTEGER
			},
			isActive: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			isExpiry: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			expiration_date: {
				type: Sequelize.DATE
			},
			register_date: {
				type: Sequelize.DATE,
			},
			priority: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			priority_expiry_date: {
				type: Sequelize.DATE,
			},
			priority_level: {
				type: Sequelize.INTEGER,
				defaultValue: 0
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
		await queryInterface.dropTable('company_service');
	}
};
