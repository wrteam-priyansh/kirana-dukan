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
    static associate({ category, measurement }) {
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
    }
  }
  product.init({
    name: DataTypes.STRING,
    measurementId: DataTypes.INTEGER,
    measurementValue: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
    tableName: 'products'
  });
  return product;
};