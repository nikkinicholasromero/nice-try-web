var express = require('express');
var router = express.Router();

router.all('/register', function(req, res, next) {
  // TODO
  // Return error if username is already present in DB
  // Insert new user_information
  // Create new folder in target folder
  res.json({status: "Registration is not yet supported"});
});

router.all('/authenticate', function(req, res, next) {
  // TODO
  // Return error if username and password does not match in DB
  // Generate, save, and send OTP
  res.json({status: "Authenticate is not yet supported"});
});

router.all('/otp/verify', function(req, res, next) {
  // TODO
  // Check if OTP is correct
  res.json({status: "OTP verification is not yet supported"});
});

module.exports = router;
