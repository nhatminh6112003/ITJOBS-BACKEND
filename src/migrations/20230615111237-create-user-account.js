'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('user_account', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_type_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'user_type', // Tên bảng mà khóa ngoại tham chiếu đến
					key: 'id' // Tên trường khóa ngoại trong bảng user_type
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
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
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
