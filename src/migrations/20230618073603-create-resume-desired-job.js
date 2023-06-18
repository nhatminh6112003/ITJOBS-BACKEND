'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('resume_desired_job', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resume_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'resume',
          key:'id'
        }
      },
      salary_from: {
        type: Sequelize.STRING
      },
      salary_to: {
        type: Sequelize.STRING
      },
      position_id: {
        type: Sequelize.INTEGER
      },
      provinces: {
        type: Sequelize.INTEGER
      },
      districts: {
        type: Sequelize.INTEGER
      },
      work_home: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('resume_desired_job');
  }
};