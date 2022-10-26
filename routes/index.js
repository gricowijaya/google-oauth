const express = require('express');
const router = express.Router();
const config = require('../config/index')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

var userProfile;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/login.ejs');
});

router.get('/success', (req, res) => res.send(userProfile));
router.get('/error', (req, res) => res.send('error logging in'));

passport.use(new GoogleStrategy({
        clientID: config.googleAuth.clientID, 
        clientSecret: config.googleAuth.clientSecret, 
        callbackURL: config.googleAuth.callbackURL, 
    }, (accessToken, refreshToken, profile, done) => { 
        userProfile = profile;
        return done(null, userProfile);
    }
))

router.get('/auth/google', passport.authenticate('google', { 
    scope: ['profile', 'email'] 
}))

router.get('/auth/google/callback', passport.authenticate('google', { 
    failureRedirect: '/error'
}), (req, res) => { res.redirect('/success') })


module.exports = router;
