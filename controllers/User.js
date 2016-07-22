const router = require('express').Router(),
  User = require('../models/User'),
  _ = require('lodash');

router.get('/account', function (req, res) {
  var user = req.user

  var providers = {
    twitter: false,
    facebook: false,
    instagram: false,
    github: false,
    google: false
  };

  user.providers.forEach(function (p) {
    if (providers[p.name] !== 'undefined') {
      providers[p.name] = true;
    }
  })

  res.render('account', { user, providers })
})

router.post('/account', function (req, res, next) {
  const body = req.body;
  var name = body.name ? body.name : req.user.name;
  var email = body.email ? body.email : req.user.email;
  var pubKey = body.pubKey ? body.pubKey : req.user.pubKey;

  console.log(body)

  if (body.email)
    req.assert('email', 'Email is not valid').isEmail();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/user/account');
  }

  req.user.profile.name = name
  req.user.email = email
  req.user.pubKey = pubKey

  console.log(req.user)

  req.user.save( function(err, saved){
    if (err) {
      req.flash('errors', {msg: 'Error: Could not update.'});
      return res.redirect('/user/account');
    }
    req.flash('success', {msg: 'Success! Account updated!'});
    return res.redirect('/user/account')
  })
})

router.get('/account/unlink/:provider', function (req, res, next) {
  var user = req.user;
  var provider = req.params.provider;

  var providers = _.filter(user.providers, function (p) {
    return p.name !== provider;
  });

  User.update({ _id: user._id }, { providers: providers }, function (err) {

    if (err) {
      return next(err)
    }

    req.flash('success', { msg: provider + ' account has been unlinked.' })
    res.redirect('/user/account');
  });

})

module.exports = router
