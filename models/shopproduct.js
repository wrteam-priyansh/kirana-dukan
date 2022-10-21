'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shopProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ }) {

      /*  


      */
    }
  }
  shopProduct.init({
    productVariantId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    isAvailable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'shopProduct',
    tableName: 'shopProducts'
  });
  return shopProduct;
};