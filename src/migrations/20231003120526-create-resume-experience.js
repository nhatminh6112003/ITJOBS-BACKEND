'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('resume_experience', {
			id: {
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				type: Sequelize.UUID
			},
			resume_id: {
				type: Sequelize.UUID,
				references: {
					model: 'resume',
					key: 'id'
				}
			},
			rexp_worktype_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'work_type',
					key: 'id'
				}
			},
			rexp_title: {
				type: Sequelize.STRING
			},
			rexp_company: {
				type: Sequelize.STRING
			},
			rexp_workdesc: {
				type: Sequelize.STRING
			},
			rexp_form: {
				type: Sequelize.DATE
			},
			rexp_to: {
				type: Sequelize.DATE
			},
			experCurrent: {
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
		await queryInterface.dropTable('resume_experience');
	}
};
