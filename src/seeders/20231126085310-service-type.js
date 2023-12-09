'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('service_type', [
			{
				id: '7abfa5ec-8c3e-11ee-b9d1-1111ac120002',
				name: 'Tuyển dụng',
				slug: 'tuyen-dung',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: '7abfa5ec-8c3e-11ee-b9d1-1221ac120002',
				name: 'Tìm hồ sơ',
				slug: 'tim-ho-so',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
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
