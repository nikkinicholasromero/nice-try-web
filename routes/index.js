var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var sourceFolder = 'C:\\files\\';
var tempFolder = 'C:\\temp\\';
var zip = require('zip-a-folder');
const { exec } = require("child_process");

router.get('/', function (req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/login');
  } else {
    res.render('index');
  }
});

router.post('/', function (req, res, next) {
  function copyFileSync(source, target) {
    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if (fs.existsSync(target)) {
      if (fs.lstatSync(target).isDirectory()) {
        targetFile = path.join(target, path.basename(source));
      }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
  }

  function copyFolderRecursiveSync(source, target) {
    var files = [];

    // Check if folder needs to be created or integrated
    var targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }

    // Copy
    if (fs.lstatSync(source).isDirectory()) {
      files = fs.readdirSync(source);
      files.forEach(function (file) {
        var curSource = path.join(source, file);
        if (fs.lstatSync(curSource).isDirectory()) {
          copyFolderRecursiveSync(curSource, targetFolder);
        } else {
          copyFileSync(curSource, targetFolder);
        }
      });
    }
  }

  fs.mkdirSync(`${tempFolder}${req.session.user.name}`, { recursive: true });
  copyFolderRecursiveSync(`${sourceFolder}${req.session.user.name}`, `${tempFolder}`);
  exec(`java Decrypt ${tempFolder}${req.session.user.name}\\`, (error, stdout, stderr) => {
    var targetFolder = `${tempFolder}${req.session.user.name}`;
    var targetDestination = `${targetFolder}.zip`;

    zip.zip(targetFolder, targetDestination).then(() => {
      res.download(targetDestination, "files.zip", function() {
        fs.rm(targetFolder, { recursive: true }, () => {});
        fs.unlinkSync(targetDestination);
      });
    });
  });
});

module.exports = router;
