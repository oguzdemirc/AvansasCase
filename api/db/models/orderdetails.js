'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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