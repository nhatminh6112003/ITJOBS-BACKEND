'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('company', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      user_acount_id: {
        type: Sequelize.UUID
      },
      company_name: {
        type: Sequelize.STRING
      },
      company_type: {
        type: Sequelize.INTEGER 
      },
      company_size: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      company_website_url: {
        type: Sequelize.STRING
      },
      banner: {
        type: Sequelize.STRING
      },
      company_sumary: {
        type: Sequelize.TEXT
      },
      tax_code: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      contact_name: {
        type: Sequelize.STRING
      },
      contact_phone: {
        type: Sequelize.STRING
      },
      position: {
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
    await queryInterface.dropTable('company');
  }
};