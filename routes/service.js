var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var sourceFolder = 'C:\\Users\\nikki\\Desktop\\files\\';

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'nice_try'
});

router.post('/register', function(req, res, next) {
  var query = `SELECT * FROM USER_INFORMATION WHERE USERNAME = "${req.body.username}"`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;

    if (rows.length > 0) {
      res.json({status: "FAILED", message: "Username already taken. "});
    } else {
      var insert = `INSERT INTO USER_INFORMATION (USERNAME, PASSWORD) VALUES ("${req.body.username}", "${req.body.password}")`;
      connection.query(insert, function (err, rows, fields) {
        if (err) throw err;
        
        fs.mkdirSync(`${sourceFolder}${req.body.username}`, { recursive: true });
        res.json({status: "SUCCESS", message: "Registration successful. "});
      });
    }
  });
});

router.post('/authenticate', function(req, res, next) {
  var query = `SELECT * FROM USER_INFORMATION WHERE USERNAME = "${req.body.username}" AND PASSWORD = "${req.body.password}"`;

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;

    if (rows.length > 0) {
        res.json({status: "SUCCESS", message: "Login successful. "});
    } else {
      res.json({status: "FAILED", message: "Username and password did not match. "});
    }
  });
});

router.post('/upload', function(req, res, next) {
  // TODO
});

module.exports = router;
