var express = require('express');
var router = express.Router();
var models  = require('../models');
var md5 = require('MD5');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll().then(function(users){
    res.json(users);
  });
});

router.post('/', function(req, res, next){
  var name = req.body.name;
  var password = req.body.password;

  models.User.findOne({where: {name: name}}).then(function(user){
    if(user && user.password == md5(password)) {
        res.cookie('user_key', user.id + "-" +  user.password).end;
    } else {
      res.status(403).end();
    }
  })
});

module.exports = router;
