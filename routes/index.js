const express = require('express');
const router  = express.Router();
const Eater = require('../models/eater');

router.get('/', (req, res, next) => {
  res.render('index');
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

//CREATING RESTAURANTS - POST


module.exports = router;


