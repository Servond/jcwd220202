"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.ProductBranch);
      Product.belongsTo(models.Category);
    }
  }
  Product.init(
    {
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      distance: {
        type: DataTypes.INTEGER,
        allowNull: true,
        allowNull: false,
      },
      product_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};