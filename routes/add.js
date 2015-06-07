var express = require('express');
var router = express.Router();

/* GET add page. */
router.get('/', function(req, res, next) {
  res.render('add', { title: '喂美芽儿－添加新菜色' });
});

module.exports = router;
