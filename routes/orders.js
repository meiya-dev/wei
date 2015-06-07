var express = require('express');
var router = express.Router();
var models  = require('../models');
var moment = require('moment');

var user_service = require('../services/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //@todo 权限验证
  var user_id = req.query.user_id;
  var day = req.query.day;

  var where = {user_id: user_id};
  if (day) {
    where.day = day;
  };

  models.Order.findAll({
    where: where
  }).then(function(orders){
    res.json(orders);
  });
});

router.post('/', function(req, res, next){
  var product_id = req.body.product_id;
  var day = moment().format("YYYY-MM-DD");
  user_service
    .get_current_user(req)
    .then(function(user){
      if (user) {
        //@todo 检查今天是否下了单
        models.Order.create({
          product_id: product_id,
          user_id: user.id,
          day: day
        }).then(function(order){
          res.json({id: order.id});
        });
      } else {
        res.status(403).end();
      };
    });
});

module.exports = router;