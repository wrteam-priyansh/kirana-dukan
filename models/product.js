'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ category, measurement, productVariant }) {
      this.belongsTo(category, {
        foreignKey: {
          name: 'categoryId'
        }
      })
      this.belongsTo(measurement, {
        foreignKey: {
          name: 'measurementId'
        }
      })

      this.hasMany(productVariant, {
        //To use alias 
        as: 'variants',
        foreignKey: {
          name: 'productId'
        }
      })




    }
  }
  product.init({
    name: DataTypes.STRING,
    measurementId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
    tableName: 'products'
  });
  return product;
};