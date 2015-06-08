var express = require('express');
var router = express.Router();
var models  = require('../models');
var moment = require('moment');

var user_service = require('../services/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var day = req.query.day;
  user_service.get_current_user(req)
    .then(function(user){
      if (user == null) {
        res.status(403).send("未登录").end();
      } else {
        var where = {user_id: user.id};
        if (day) {
          where.day = day;
        };

        models.Order.findAll({
          where: where
        }).then(function(orders){
          res.json(orders);
        });
      };
    });
});

router.post('/', function(req, res, next){
  var product_id = req.body.product_id;
  var day = moment().format("YYYY-MM-DD");
  user_service.get_current_user(req)
    .then(function(user){
      if (user == null) {
        res.status(403).send("未登录").end();
      } else {
        models.Order.findAll({
          where: {
            user_id: user.id,
            day: day,
          }
        }).then(function(orders){
          if (orders.length > 0) {
            res.status(403).send("喂！你今天已经点过了哦").end();
          } else {
            models.Order.create({
              product_id: product_id,
              user_id: user.id,
              day: day
            }).then(function(order){
              res.json({id: order.id});
            });
          };
        });
      }
    })
});

module.exports = router;