'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {

    static associate(models) {
      OrderDetails.belongsTo(models.Books, {
        foreignKey: 'book_id',
        as: 'book',
      });

      OrderDetails.belongsTo(models.Orders, {
        foreignKey: 'order_id',
        as: 'order'
      })
    }
  }
  OrderDetails.init({
    order_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    total_price: DataTypes.DOUBLE,
    is_removed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'OrderDetails',
  });
  return OrderDetails;
};