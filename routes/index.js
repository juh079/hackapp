var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
	res.render('hacksc', { title: '#Rektified' });
});

router.get('/hacksc', function(req, res, next) {
  res.render('hacksc', { title: 'HackSC!' });
});

router.get('/userlist',function(req,res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs){
		res.render('userlist',{
			"userlist" : docs
		});
	});
});

module.exports = router;
