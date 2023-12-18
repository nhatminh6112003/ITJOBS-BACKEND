'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('job_post', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			company_service_id: {
				allowNull: true,
				type: Sequelize.UUID,
				references: {
					model: 'company_service',
					key: 'id'
				},
			},
			posted_by_id: {
				type: Sequelize.UUID,
				references: {
					model: 'user_account',
					key: 'id'
				}
			},
			company_id: {
				type: Sequelize.UUID,
				references: {
					model: 'company',
					key: 'id'
				}
			},
			job_degree_value: {
				type: Sequelize.INTEGER
			},
			job_position_value: {
				type: Sequelize.INTEGER
			},
			job_experience_value: {
				type: Sequelize.TINYINT
			},
			address: {
				type: Sequelize.STRING
			},
			form_age: {
				type: Sequelize.STRING
			},
			to_age: {
				type: Sequelize.STRING
			},
			job_title: {
				type: Sequelize.STRING
			},
			gender: {
				type: Sequelize.TINYINT
			},
			is_address_work_hidden: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			min_salary: {
				type: Sequelize.INTEGER
			},
			max_salary: {
				type: Sequelize.INTEGER
			},
			expiry_date: {
				type: Sequelize.DATE
			},
			posted_date: {
				type: Sequelize.DATE
			},
			job_desc: {
				type: Sequelize.TEXT
			},
			job_request: {
				type: Sequelize.TEXT
			},
			status: {
				type: Sequelize.TINYINT,
				defaultValue: 0
			},
			work_home: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			isDeleted: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			job_formExperience: {
				type: Sequelize.INTEGER
			},
			job_ToExperience: {
				type: Sequelize.INTEGER
			},
			provinces: {
				type: Sequelize.INTEGER
			},
			districts: {
				type: Sequelize.INTEGER
			},
			isAgreement: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
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
		await queryInterface.dropTable('job_post');
	}
};
