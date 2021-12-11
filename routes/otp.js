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
    res.render('otp');
});

router.post('/', function(req, res, next) {
    var query = `SELECT * FROM USER_INFORMATION WHERE USERNAME = "${req.body.username}" AND OTP = "${req.body.otp}"`;

    connection.query(query, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length > 0) {
            req.session.user = {name: req.body.username};
            res.redirect('/');
        } else {
            res.render('otp', { username: req.body.username, message: "Invalid OTP!" });
        }
    });
});

module.exports = router;
