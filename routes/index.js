var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/login');
  } else {
    res.render('index', { title: 'Nice Try' });
  }
});

module.exports = router;
