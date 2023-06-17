'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  	const data = [
			{ name: 'Hồ sơ ItJobs' },
			{ name: 'Đính kèm File' },
			{ name: 'Đính kèm CVhay' },
		];
		await queryInterface.bulkInsert('resume_type', data);
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
