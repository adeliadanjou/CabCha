const express = require('express');
const router  = express.Router();
const Eater = require('../models/eater');
const Restaurant = require('../models/restaurant');

router.get('/', (req, res, next) => {
  res.render('index');
});

//EATERS - POST 

router.post('/eaters', (req, res, next) => {

	const newEater = new Eater({
		name: req.body.name,
		email: req.body.email
	});

	newEater.save((error) => {
		if (error) { 
			next(error); 
		} else { 
			res.send(200);
		}
	});
});

// EATERS - GET
router.get('/eaters', (req, res, next) => {
	Eater.find({},(error, eatersFromDB) => {
		if (error) { 
			next(error); 
		} else { 
			res.send(200, eatersFromDB);
		}
	});
});

// RESTAURANTS - POST

router.post('/restaurants', (req, res, next) => {

	const newRestaurant = new Restaurant({
		name: req.body.name,
		address: req.body.address
	});

	newRestaurant.save((error) => {
		if (error) { 
			next(error); 
		} else { 
			res.send({message: "created"});
		}
	});
});

// RESTAURANTS - GET

router.get('/restaurants', (req, res, next) => {
	Restaurant.find({},(error, restaurantFromDB) => {
		if (error) { 
			next(error); 
		} else { 
			res.send(200, restaurantFromDB);
		}
	});
});

// EATERS - DELETE (Deleting all eaters and restaurants)

router.delete('/eaters',(req, res, next) => {
	
	Restaurant.remove({}, function(error, restaurant) {
		if (error) {
			next(error);
		} else {
			res.send({message: "eaters and restaurants removed"});
		}
	});
	Eater.remove({}, function(error, eater) {
		if (error) {
			next(error);
		} else {
			res.send({message: "eaters and restaurants removed"});
		}
	});
});


module.exports = router;


