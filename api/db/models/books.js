'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Books.belongsTo(models.Categories,{
        as:'category',
        foreignKey:'category_id'
      })
    }
  }
  Books.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    isbn: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    stock: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    publish_year: DataTypes.INTEGER,
    is_removed:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};