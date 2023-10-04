'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('resume_addioninfo', {
      resume_id: {
        allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				type: Sequelize.UUID
      },
      addioninfo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('resume_addioninfo');
  }
};