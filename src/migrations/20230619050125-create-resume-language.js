'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('resume_languages', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			resume_id: {
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
		await queryInterface.dropTable('resume_languages');
	}
};
