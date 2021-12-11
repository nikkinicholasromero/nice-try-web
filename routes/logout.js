var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  req.session.user = undefined;
  res.redirect('/');
});

module.exports = router;
