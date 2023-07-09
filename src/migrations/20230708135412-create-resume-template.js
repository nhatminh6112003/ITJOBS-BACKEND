'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('resume_template', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resume_id: {
        type: Sequelize.UUID
      },
      cv_color: {
        type: Sequelize.STRING
      },
      cv_font: {
        type: Sequelize.STRING
      },
      cv_font_color: {
        type: Sequelize.STRING
      },
      cv_language: {
        type: Sequelize.STRING
      },
      cv_size: {
        type: Sequelize.STRING
      },
      default_color: {
        type: Sequelize.STRING
      },
      default_font: {
        type: Sequelize.STRING
      },
      default_size: {
        type: Sequelize.STRING
      },
      default_template_name: {
        type: Sequelize.STRING
      },
      default_template_color: {
        type: Sequelize.STRING
      },
      default_template: {
        type: Sequelize.STRING
      },
      cv_template_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'cv_template',
          key:'id'
        }
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
    await queryInterface.dropTable('resume_template');
  }
};