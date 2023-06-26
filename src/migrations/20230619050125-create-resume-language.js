'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('resume_language', {
			resume_id: {
				primaryKey:true,
				type: Sequelize.INTEGER
			},
			rs_language: {
				type: Sequelize.ENUM('vn', 'en', 'fr', 'de', 'ru', 'cn', 'kr', 'jp', 'other')
			},
			rs_language_level: {
				type: Sequelize.ENUM('1', '2', '3', '4', '5')
			},
			rs_language_certify: {
				type: Sequelize.STRING(200)
			},
			status:{
				type:Sequelize.BOOLEAN,
				defaultValue:false
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
		await queryInterface.dropTable('resume_language');
	}
};
