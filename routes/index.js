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

/*GET new user*/
router.get('/newuser',function(req,res){
	res.render('newuser',{title:'Add New User'});
});

/*POST to Add User Service */
router.post('/adduser',function(req,res){

	//Set out internal DB variable
	var db = req.db;

	//Get out form value. These rely on the "name" attributes
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	//Set our collection
	var collection = db.get("usercollection");

	//submit to the DB
	collection.insert({
		"username":userName,
		"email":userEmail
	}, function(err,doc){
		if(err){
			//if it failed, return error
			res.send("There was a problem adding the info to the database!");
		}
		else{
			//And forward to success page
			res.redirect("userlist");
		}
	});
});

module.exports = router;
