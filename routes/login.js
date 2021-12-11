var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'nice_try'
});

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
  if ('nikkinicholas.romero@gmail.com' === req.body.username && 'password' === req.body.password) {
    var otp = "123456";
    res.render('otp', { username: req.body.username });
  } else {
    res.render('login', { message: "Invalid credentials!"});
  }
});

module.exports = router;
