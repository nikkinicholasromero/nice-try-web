var express = require('express');
var router = express.Router();
var sourceFolder = 'C:\\Users\\nikki\\Desktop\\files\\';
var zip = require('zip-a-folder');

router.get('/', function(req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/login');
  } else {
    res.render('index');
  }
});

router.post('/', function(req, res, next) {
  var targetFolder = `${sourceFolder}${req.session.user.name}`;
  var targetDestination = `${targetFolder}.zip`;

  zip.zip(targetFolder, targetDestination).then(() => {
    res.download(targetDestination);
  });
});

module.exports = router;
