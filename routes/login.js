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
  var query = `SELECT * FROM USER_INFORMATION WHERE USERNAME = "${req.body.username}" AND PASSWORD = "${req.body.password}"`;

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;

    if (rows.length > 0) {
      var otp = (Math.floor(Math.random() * 1000000) + "").padStart(6, "0");
      var update = `UPDATE USER_INFORMATION set OTP = "${otp}" WHERE USERNAME = "${req.body.username}"`;

      connection.query(update, function (err, rows, fields) {
        if (err) throw err;

        // Send email with OTP
        console.log("Generated OTP is : " + otp);
        res.render('otp', { username: req.body.username });
      });
      
    } else {
      res.render('login', { message: "Invalid credentials!"});
    }
  });
});

module.exports = router;
