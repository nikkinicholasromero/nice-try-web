var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('otp');
});

router.post('/', function(req, res, next) {
    if ('nikkinicholas.romero@gmail.com' === req.body.username && 123456 == req.body.otp) {
        req.session.user = {name: req.body.username};
        res.redirect('/');
    } else {
        res.render('otp', { username: req.body.username, message: "Invalid OTP!"});
    }
});



module.exports = router;
