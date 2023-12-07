('use strict');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'service_type',
			[
				{
					id: '27085756-6d6a-4d9f-8706-538a68a881e9',
					name: 'Tuyển dụng',
					slug: 'tuyen-dung',
               createdAt:new Date(),
               updatedAt:new Date(),
				}
			],
			{}
		);
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
