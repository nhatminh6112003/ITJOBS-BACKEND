'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const data = [
			{ name: 'Nhân viên chính thức' },
			{ name: 'Bán thời gian' },
			{ name: 'Thời vụ - Nghề tự do' },
			{ name: 'Thực tập' }
		];
		await queryInterface.bulkInsert('work_type', data);
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
