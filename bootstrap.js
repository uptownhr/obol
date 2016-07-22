'use strict'

const express = require('express'),
  mongoose = require('mongoose'),
  config = require('./config'),
  path = require('path'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  flash = require('express-flash'),
  expressValidator = require('express-validator'),
  cookieParser = require('cookie-parser'),
  moment = require('moment')

require('./config/seed.js')

const RedisStore = require('connect-redis')(session)
const app = express()

/*connect to mongodb */
mongoose.connect(config.mongodb)

mongoose.connection.on('error', () => {
  console.log('Mongodb connection error')
  process.exit(1)
})

mongoose.connection.on('connected', () => {
  // listen on config port, default 3000
  app.server = app.listen(config.port, function (e) {
    console.log('listening on', config.port, config.mongodb)
  })
})

/* configure application */
app.set('view engine', 'jade')
app.locals.pretty = true
app.locals.moment = moment

//specify public static directory
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret,
  store: new RedisStore({ url: config.redis })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

app.use((req, res, next) => {
  if (!req.user || !req.user.askEmail || req.user.email || req.path == '/askEmail') return next()

  console.log('redirecting for email')
  return res.redirect('/askEmail')
})

app.get('/askEmail', (req, res) => {
  res.render('askEmail')
})

app.post('/askEmail', (req, res) => {
  console.log('POST EMAIL')
  req.assert('email', 'Email is not valid').isEmail();

  var errors = req.validationErrors();

  if (errors) {
    console.log('error', errors)
    req.flash('errors', errors);
    return res.redirect('/askEmail');
  }

  const body = req.body

  req.user.askEmail = false
  req.user.email = body.email
  req.user.save((err, saved) => {
    console.log(err, saved)
    res.redirect('/')
  })
})

module.exports = app
