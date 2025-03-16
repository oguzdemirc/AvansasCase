'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
  
    static associate(models) {

      Orders.belongsTo(models.OrderStatuses, {
        foreignKey: 'status_id',
        as: 'order_status'
      });

      Orders.hasMany(models.OrderDetails, {
        foreignKey: 'order_id',
        as: 'order_details'
      })
    }
  }
  Orders.init({
    total_quantity: DataTypes.INTEGER,
    total_price: DataTypes.DOUBLE,
    status_id: DataTypes.INTEGER,
    is_removed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};