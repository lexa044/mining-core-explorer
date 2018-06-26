var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET faq page. */
router.get('/faq', function(req, res, next) {
  res.render('faq');
});

module.exports = router;
