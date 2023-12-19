'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'benefits',
			[
				{
					id: 'f649275c-6e8c-4bbf-8d81-e80798c91235',
					name: '30 ngày đăng tuyển dụng',
					description: '30 ngày đăng tuyển dụng',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					id: '21d32d32-5a1b-47ee-bdc0-be4afc6ff64f',
					name: 'Top tìm kiếm trong 30 ngày',
					description: 'Top tìm kiếm trong 30 ngày',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					id: '21d32d32-5a1b-47ee-bdc0-be4afc6ff64s',
					name: 'Top tìm kiếm trong 15 ngày',
					description: 'Top tìm kiếm trong 15 ngày',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					id: '21d32d32-5a1b-47ee-bdc0-be4afc6ff63d',
					name: 'Top tìm kiếm trong 7 ngày',
					description: 'Top tìm kiếm trong 7 ngày',
					createdAt: new Date(),
					updatedAt: new Date()
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
