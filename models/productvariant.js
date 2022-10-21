'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productVariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ product, shop, shopProduct }) {
      this.belongsTo(product, {
        foreignKey: {
          name: 'productId'
        }
      })
      this.belongsToMany(shop, { through: shopProduct, foreignKey: 'productVariantId', as: 'shops' })
    }
  }
  productVariant.init({
    productId: DataTypes.INTEGER,
    measurementValue: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'productVariant',
    tableName: 'productVariants'
  });
  return productVariant;
};