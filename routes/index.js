const express = require('express');
const router = express.Router();
const passport = require('passport')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/login.ejs');
});


router.get('/auth/google', 
    passport.authenticate('google', { 
    scope: ['profile', 'email'] 
}))

router.get('/auth/google/callback', 
    passport.authenticate('google', { 
        successRedirect: '/success',
        failureRedirect: '/error'
}), (req, res) => { res.redirect('/success') })


router.get('/success', (req, res) => { 
    res.render('pages/success.ejs', {user: req.user})
});
 
router.get('/error', (req, res) => res.send('error logging in'));

module.exports = router;
