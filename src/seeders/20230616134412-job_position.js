'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const data = [
			{ position: 'Sinh viên / Thực tập sinh', createdAt: new Date(), updatedAt: new Date() },
			{ position: 'Mới tốt nghiệp', createdAt: new Date(), updatedAt: new Date() },
			{ position: 'Nhân viên', createdAt: new Date(), updatedAt: new Date() },
			{ position: 'Trưởng nhóm / Giám sát', createdAt: new Date(), updatedAt: new Date() },
			{ position: 'Quản lý', createdAt: new Date(), updatedAt: new Date() },
			{ position: 'Phó giám đốc', createdAt: new Date(), updatedAt: new Date() },
			{ position: 'Tổng giám đốc', createdAt: new Date(), updatedAt: new Date() },
			{ position: 'Giám đốc', createdAt: new Date(), updatedAt: new Date() },
			{ position: 'Chủ tịch / Phó chủ tịch', createdAt: new Date(), updatedAt: new Date() }
		];
		await queryInterface.bulkInsert('job_position', data);
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
