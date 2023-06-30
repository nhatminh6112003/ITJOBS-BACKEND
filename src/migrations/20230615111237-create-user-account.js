'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('user_account', {
			id: {
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				type: Sequelize.UUID,
			},
			firstname: {
				type: Sequelize.STRING
			},
			lastname: {
				type: Sequelize.STRING
			},
			user_type_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'user_type',
					key: 'id'
				}
			},
			email: {
				type: Sequelize.STRING
			},
			password: {
				type: Sequelize.STRING
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
		// .then(() => queryInterface.addConstraint('user_account', {
		// 	type: 'FOREIGN KEY',
		// 	fields: ['user_type_id'],
		// 	references: {
		// 	  table: 'user_type',
		// 	  field: 'id',
		// 	},
		// 	onDelete: 'no action',
		// 	onUpdate: 'no action',
		//  }))
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('user_account');
	}
};
