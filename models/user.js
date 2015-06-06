"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
  }, {
    'paranoid': true,
    'underscoredAll': true,
    'underscored': true,
  });

  return User;
};
