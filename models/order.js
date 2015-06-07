'use strict';

module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    day: DataTypes.STRING,
  }, {
    'paranoid': true,
    'underscoredAll': true,
    'underscored': true,
  });

  return Order;
};