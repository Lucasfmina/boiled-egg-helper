var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mole', function (req, res) {
  res.render('timer');
});

router.get('/ao-ponto', function (req, res) {
  res.render('timer');
});

router.get('/dura', function (req, res) {
  res.render('timer');
});


module.exports = router;
