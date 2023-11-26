'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('service', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			service_type_id: {
				type: Sequelize.UUID,
				allowNull: true
			},
			price: {
				type: Sequelize.INTEGER
			},
			description: {
				type: Sequelize.STRING
			},
			name: {
				type: Sequelize.STRING
			},
			slug: {
				type: Sequelize.STRING,
				unique: true
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
		await queryInterface.dropTable('service');
	}
};
