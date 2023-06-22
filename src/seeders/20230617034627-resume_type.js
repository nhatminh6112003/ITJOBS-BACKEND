'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const data = [
			{ resume_type_name: 'Hồ sơ ItJobs' },
			{ resume_type_name: 'Đính kèm File' },
			{ resume_type_name: 'Đính kèm CVhay' }
		];
		await queryInterface.bulkInsert('resume_type', data);
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
