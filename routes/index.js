var express = require('express');
var router = express.Router();
var testFolder = 'C:\\Users\\nikki\\Desktop\\files';
var zip = require('zip-a-folder');

router.get('/', function(req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/login');
  } else {
    res.render('index');
  }
});

router.post('/', function(req, res, next) {
  zip.zip(testFolder + "\\" + req.session.user.name, testFolder + "\\" + req.session.user.name + ".zip").then(() => {
    res.download(testFolder + "\\" + req.session.user.name + ".zip");
  });
});

module.exports = router;
