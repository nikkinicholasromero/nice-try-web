var express = require('express');
var router = express.Router();
var sourceFolder = 'C:\\files\\';
var zip = require('zip-a-folder');
const { exec } = require("child_process");

router.get('/', function(req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/login');
  } else {
    res.render('index');
  }
});

router.post('/', function(req, res, next) {
  // copy files to a new temp folder
  // decrypt temp folder
  // zip temp folder
  // delete temo folder
  // download temp folder
  // delete zip

  // exec(`java Decrypt ${sourceFolder}${req.session.user.name}`, (error, stdout, stderr) => {
  //   console.log(`stdout: ${stdout}`);
  //   var targetFolder = `${sourceFolder}${req.session.user.name}`;
  //   var targetDestination = `${targetFolder}.zip`;
  
  //   zip.zip(targetFolder, targetDestination).then(() => {
  //     res.download(targetDestination);
  //   });
  // });
});

module.exports = router;
