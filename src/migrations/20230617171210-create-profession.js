/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('profession', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			jobPositionCategoryId:{
				type: Sequelize.UUID,
				references: {
					model: 'job_position_category',
					key: 'id'
				},
				allowNull:true
			}
		})
		// .then(() => queryInterface.addConstraint('profession', {
		// 	type: 'FOREIGN KEY',
		// 	fields: ['jobPositionCategoryId'],
		// 	references: {
		// 	  table: 'job_position_category',
		// 	  field: 'id',
		// 	},
		// 	onDelete: 'no action',
		// 	onUpdate: 'no action',
		//  }))
		// await queryInterface.addIndex('job_position_category', ['id']);
		
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('profession');
	}
};
