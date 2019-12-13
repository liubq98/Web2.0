var express = require('express');
var router = express.Router();
var users = {}

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: '注册', user: {}});
});

router.post('/index', function(req, res, next) {
	res.redirect('info');
});

router.get('/info', function(req, res, next) {
  res.render('info', { title: '详情' });
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: '登录' });
});

  router.get('/signout', function(req, res, next) {
    res.redirect('/signin');
  });

module.exports = router;
