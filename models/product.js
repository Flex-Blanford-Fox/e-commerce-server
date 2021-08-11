'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart, {foreignKey:"ProductId"})
    }
  };
  Product.init({
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    stock: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate(instance, options){
        if (instance.price < 0 || instance.stock <0){
          throw new Error({name: "price and stock cannot be negative"})
        }
      },
      afterUpdate(instance,options){
        if (instance.price < 0 || instance.stock <0){
          throw new Error({name: "price and stock cannot be negative"})
        }
      }
    },
    sequelize,
    modelName: 'Product',
  });
  return Product;
};