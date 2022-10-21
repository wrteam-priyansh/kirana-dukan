'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class measurement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ product }) {
      // define association here
      this.hasMany(product, {
        foreignKey: {
          name: 'measurementId'
        },
        onDelete: 'CASCADE'
      })
    }
  }
  measurement.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'measurement',
    tableName: 'measurements'
  });
  return measurement;
};