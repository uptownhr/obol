const router = require('express').Router()
const async = require('async'),
  config = require('../config'),
  Project = require('../models/Project'),
  Product = require('../models/Product');

const stripe = require('stripe')(config.payment.stripe.secret_key);
router.get('/', function (req, res) {

  async.parallel({
    projects: function (callback) {
      Project.find({}).exec(callback);
    },

    products: function (callback) {
      Product.find({}).exec(callback);
    }
  }, function (err, result) {
    result.stripe = config.payment.stripe.public_key;
    res.render('index', result);
  });

})

router.post('/charge', function (req, res) {
    var stripeToken = req.body.stripeToken;

    async.waterfall([
      function (callback) {
        Product.findOne({ _id: req.body.id }, function (err, product) {
          callback(null, product);
        });
      },

      function (product, callback) {
        var charge = stripe.charges.create({
          amount: product.price * 100, //cents
          description: product.name,
          currency: 'usd',
          source: stripeToken
        }, function (err, charge) {
          callback(err, charge);
        });
      }
    ], function (err, charge) {
      if (err && err.type === 'StripeCardError') {
        req.flash('error', { msg: 'Error: Card has been declined.' });
      } else if (err) {
        req.flash('error', { msg: 'Error: Payment did not go through.' });
      } else {
        req.flash('success', { msg: 'Success: Payment has been accepted.' });
      }

      res.redirect('/');
    });
  })

module.exports = router
