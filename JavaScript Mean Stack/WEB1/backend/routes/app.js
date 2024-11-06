var express = require('express'); 
var router = express.Router();
var User = require('../model/user');

router.post('/teste', async (req, res, next) => {
    var user = new User({
        firstName: req.body.name,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email
    });
   await user.save();
   res.redirect('/');
});

router.get('/', (req, res, next) => {
    res.render('index');
});


module.exports = router; 


