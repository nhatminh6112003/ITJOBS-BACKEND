/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const data = [
			{ name: 'Nguời tìm việc', createdAt: new Date(), updatedAt: new Date() },
			{
				name: 'Nguời tuyển dụng',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{ name: 'Admin', createdAt: new Date(), updatedAt: new Date() }
		];
		await queryInterface.bulkInsert('user_type', data);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	}
};
