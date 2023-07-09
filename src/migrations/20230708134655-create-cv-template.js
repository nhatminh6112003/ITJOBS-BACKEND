'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cv_template', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      color_pick: {
        type: Sequelize.TEXT
      },
      html_template_en: {
        type: Sequelize.TEXT
      },
      html_template_vi: {
        type: Sequelize.TEXT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cv_template');
  }
};