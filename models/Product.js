// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Category = require('./Category');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowsNull: false,
      primaryKey: true,
      autoIncrement: true,
    }, // define columns

    product_name: {
      type: DataTypes.STRING,
      allowsNull: false,

    },
    price: {
      type: DataTypes.DECIMAL,
      allowsNull: false,
      validate: { isDecimal: true, }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      value: {
        default: 10,
        validate: { isNumeric: true, }
      },
      category_id: {
        type: DataTypes.INTEGER,
        // belongsTo(Category)
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
