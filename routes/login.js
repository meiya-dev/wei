var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '喂美芽儿－登录' });
});

module.exports = router;
