/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('resume_profile', {
			resume_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: 'resume',
					key: 'id'
				},
				primaryKey: true
			},
			user_account_id:{
				type: Sequelize.UUID,
				references: {
					model: 'user_account',
					key: 'id'
				}
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
			provinces: {
				type: Sequelize.INTEGER
			},
			districts: {
				type: Sequelize.INTEGER
			},
			address:{
				type: Sequelize.STRING
			},
			birthday: {
				type: Sequelize.DATEONLY
			},
			status: {
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
		await queryInterface.dropTable('resume_profile');
	}
};
