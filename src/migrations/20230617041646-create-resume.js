/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('resume', {
			id: {
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				type: Sequelize.UUID
			},
			user_account_id: {
				type: Sequelize.UUID,
				references: {
					model: 'user_account', // Tên bảng mà khóa ngoại tham chiếu đến
					key: 'id'
				}
			},
			resume_type_id: {
				type: Sequelize.TINYINT,
				references: {
					model: 'resume_type', // Tên bảng mà khóa ngoại tham chiếu đến
					key: 'id' // Tên trường khóa ngoại trong bảng user_type
				}
			},
			resume_active: {
				type: Sequelize.ENUM('1', '2', '3'),
				defaultValue:"1"
			},
			resume_complete: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			isDeleted: {
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
		await queryInterface.dropTable('resume');
	}
};
