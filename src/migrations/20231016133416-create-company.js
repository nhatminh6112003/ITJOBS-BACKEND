'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('company', {
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
			company_name: {
				type: Sequelize.STRING
			},
			company_type: {
				type: Sequelize.INTEGER
			},
			provinces: {
				type: Sequelize.INTEGER
			},
			company_size: {
				type: Sequelize.STRING
			},
			logo: {
				type: Sequelize.STRING,
				allowNull:true
			},
			company_website_url: {
				type: Sequelize.STRING,
				allowNull:true
			},
			banner: {
				type: Sequelize.STRING,
				allowNull:true
			},
			company_summary: {
				type: Sequelize.TEXT,
				allowNull:true
			},
			tax_code: {
				type: Sequelize.STRING
			},
			address: {
				type: Sequelize.STRING
			},
			contact_name: {
				type: Sequelize.STRING
			},
			contact_phone: {
				type: Sequelize.STRING
			},
			position: {
				type: Sequelize.STRING,
				allowNull:true
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
		await queryInterface.dropTable('company');
	}
};
