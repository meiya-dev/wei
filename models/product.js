"use strict";

module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    name: DataTypes.STRING,
  }, {
    'paranoid': true,
    'underscoredAll': true,
    'underscored': true,
  });

  return Product;
};
