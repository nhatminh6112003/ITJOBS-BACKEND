'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'service',
			[
				{
					id: '7abfa5ec-8c3e-11ee-b9d1-0242ac120002',
					name: 'Tuyển dụng ứng viên',
					price: 1000000,
					description: 'Đăng tuyển dụng lên website'
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
