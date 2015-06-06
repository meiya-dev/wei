'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: Sequelize.INTEGER,
      product_id: Sequelize.INTEGER,
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      },
    }, {
      collate: 'utf8_general_ci',
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('orders');
  }
};
