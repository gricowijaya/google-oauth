require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const routes = require('./routes/index');
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
const config = require('./config/index')
const path = require('path');


const {
    PORT
} = process.env

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'this is a secret',
    saveUninitialized: true,
    resave: false
}));

// passport setup 
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

app.set('view-engine', 'ejs');



passport.serializeUser( (user, cb) => { cb(null, user); } )
passport.deserializeUser( (obj, cb) => { cb(null, obj); } )

passport.use(new GoogleStrategy({
        clientID: config.googleAuth.clientID, 
        clientSecret: config.googleAuth.clientSecret, 
        callbackURL: config.googleAuth.callbackURL, 
    }, (accessToken, refreshToken, profile, done) => { 
        return done(null, profile);
    }
));


app.use(routes);
app.listen(PORT, () => { console.log(`running at port ${PORT}, the callback is ${config.googleAuth.callbackURL}`) });

module.exports = app;
