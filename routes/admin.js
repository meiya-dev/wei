var express = require('express');
var router = express.Router();

/* GET admin page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: '喂美芽儿－管理' });
});

module.exports = router;
