var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Nice Try' });
});

router.post('/', function(req, res, next) {
  if ('username' === req.body.username && 'password' === req.body.password){
      req.session.user = {name: req.body.username};
      res.redirect('/');
  } else {
    res.render('login', { title: 'Nice Try', message: "Invalid credentials!"});
  }
});

module.exports = router;
