'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'measurementValue');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
