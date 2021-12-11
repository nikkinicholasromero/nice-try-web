var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var sourceFolder = 'C:\\Users\\nikki\\Desktop\\files\\';
var nodemailer = require('nodemailer');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'nice_try'
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '{{EMAIL_ADDRESS}}',
    pass: '{{EMAIL_PASSWORD}}'
  }
});

router.post('/register', function(req, res, next) {
  var query = `SELECT * FROM USER_INFORMATION WHERE USERNAME = "${req.body.username}"`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;

    if (rows.length > 0) {
      res.json({status: "FAILED", message: "Username already used. "});
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
      var otp = (Math.floor(Math.random() * 1000000) + "").padStart(6, "0");
      var update = `UPDATE USER_INFORMATION set OTP = "${otp}" WHERE USERNAME = "${req.body.username}"`;

      connection.query(update, function (err, rows, fields) {
        if (err) throw err;

        var mailOptions = {
          from: '{{EMAIL_ADDRESS}}',
          to: req.body.username,
          subject: 'Nice Try OTP',
          text: `Your OTP is ${otp}`
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        
        res.json({status: "SUCCESS", message: "OTP sent to your email. "});
      });
    } else {
      res.json({status: "FAILED", message: "Username and password did not match. "});
    }
  });
});

router.all('/otp/verify', function(req, res, next) {
  // TODO
  // Check if OTP is correct
  res.json({status: "OTP verification is not yet supported"});
});

module.exports = router;
