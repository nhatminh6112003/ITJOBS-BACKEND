/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('resume_desired_job', {
			resume_id: {
				primaryKey: true,
				type: Sequelize.UUID,
				references: {
					model: 'resume',
					key: 'id'
				}
			},
			salary_from: {
				type: Sequelize.STRING
			},
			salary_to: {
				type: Sequelize.STRING
			},
			position_id: {
				type: Sequelize.INTEGER,
				references:{
					key:'id',
					model:'job_position'
				}
			},
			provinces: {
				type: Sequelize.INTEGER
			},
			districts: {
				type: Sequelize.INTEGER
			},
			work_home: {
				type: Sequelize.BOOLEAN
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
		await queryInterface.dropTable('resume_desired_job');
	}
};
