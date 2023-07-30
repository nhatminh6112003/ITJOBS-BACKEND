'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
			{name: 'Tiếp thị / Marketing' },
			{name: 'Bán lẻ / Bán sỉ ' },
		];
		await queryInterface.bulkInsert('profession', data);
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
