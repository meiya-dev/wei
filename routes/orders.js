var express = require('express');
var router = express.Router();
var models  = require('../models');

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
  var user_id = req.query.user_id;
  var product_id = req.query.product_id;

  //@todo 取当前登录用户id
  //@todo 检查当天是否点过餐
  models.Order.create({
    product_id: product_id,
    user_id: user_id,
  }).then(function(order){
    res.json({id: order.id});
  });
});

module.exports = router;