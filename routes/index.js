var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/login');
  } else {
    res.render('index');
  }
});

module.exports = router;
