'use strict';

var models  = require('../models');

module.exports.get_current_user = function(req) {
  return new Promise(function(resolve, reject) {
    var user_key = req.cookies.user_key;
    if (user_key) {
      user_key = user_key.split('-');
      var user_id = user_key[0];
      var password = user_key[1];

      models.User.findOne({
        where: {id: user_id, password: password}
      }).then(function(data){
        resolve(data);
      })
    } else {
      reject();
    };
  })
};