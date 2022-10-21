'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ city, user, productVariant, shopProduct }) {
      // define association here
      this.belongsTo(city, {
        foreignKey: 'cityId',
      })
      this.belongsTo(user, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
      this.belongsToMany(productVariant, { through: shopProduct, foreignKey: 'shopId', as: 'products' })
    }
  }
  shop.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    lognitude: DataTypes.DOUBLE,
    cityId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'shop',
    tableName: 'shops'
  });
  return shop;
};