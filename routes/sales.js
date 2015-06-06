var express = require('express');
var router = express.Router();
var moment = require('moment');

var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Sale.findAll({
    where: {
      day: moment().format("YYYY-MM-DD")
    },
    include: [
      {model: models.Product}
    ]
  }).then(function(sales){
    res.json(sales);
  });
});

router.post('/', function(req, res, next) {
  var product_name = req.param('product_name');
  var day = moment().format("YYYY-MM-DD");

  models.Product.findOrCreate({
    where: {name: product_name}
  }).spread(function(product, created){
    models.Sale.create({
      product_id: product.id,
      day: day
    }).then(function(sale){
      res.json({id: sale.id});
    });
  });
  
});

module.exports = router;
