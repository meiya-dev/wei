'use strict';

var config = require('config');

var db_configs = {
  'username': config.get('db.user_name'),
  'password': config.get('db.password'),
  'database': config.get('db.db'),
  'host': config.get('db.host'),
  'port': config.get('db.port'),
};

module.exports = {
  'development': db_configs,
  'test': db_configs,
  'production': db_configs,
};