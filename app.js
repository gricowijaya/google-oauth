const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('./routes/index');
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')

const {
    PORT
} = process.env

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'this is a secret',
    saveUninitialized: true,
    resave: false
}));

// passport setup 
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser( (user, cb) => { cb(null, user); } )
passport.deserializeUser( (obj, cb) => { cb(null, obj); } )

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.set('view-engine', 'ejs');



app.use(flash())

app.use('/', routes);


app.listen(PORT, () => { console.log(`running at port ${PORT}`) });


module.exports = app;
