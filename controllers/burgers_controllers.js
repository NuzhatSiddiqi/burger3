var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();
var burger = require('../models')['burgers'];


router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	burger.findAll({}).then(function(data){
		var hbsObject = { burgers: data };
		console.log(hbsObject);
		res.render('index', hbsObject);
	}); 
});

router.post('/burgers/create', function(req, res){
	console.log(req.body.burger_name, " = entered name for burger")
	burger.create({burger_name: req.body.burger_name}, {devoured: req.body.devoured}).then(function(data){
		res.redirect('/burgers');
	})
});

router.put('/burgers/update/:id', function (req, res) {
	var condition = req.params.id;
	console.log('condition', condition);

	burger.update({
        devoured: req.body.devoured
    }, {
        where: {
            id: condition
        }
    }).then(function() {
        res.redirect('/');
    });
});

module.exports = router;