'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shopProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      productVariantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'productVariants',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      shopId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'shops',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('shopProducts');
  }
};