"use strict";

module.exports = function(sequelize, DataTypes) {
  var Sale = sequelize.define("Sale", {
    product_id: DataTypes.INTEGER,
    day: DataTypes.STRING,
  }, {
    'paranoid': true,
    'underscoredAll': true,
    'underscored': true,
  });

  return Sale;
};
