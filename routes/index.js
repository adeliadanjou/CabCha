const express = require('express');
const router = express.Router();
const Eater = require('../models/eater');
const Restaurant = require('../models/restaurant');
const Group = require('../models/group');
const {
	random,
	oldLeaders
} = require('../helpers/helpers');
const OldLeader = require('../models/oldLeader');
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
			res.status(200).end();
		}
	});
});

// EATERS - GET | Full list of eaters showed here. 
router.get('/eaters', (req, res, next) => {
	Eater.find({}, (error, eatersFromDB) => {
		if (error) {
			next(error);
		} else {
			res.status(200).json(eatersFromDB);
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
			res.status(200).json({
				message: "created"
			});
		}
	});
});

// RESTAURANTS - GET | The whole restaurants list showed here. 

router.get('/restaurants', (req, res, next) => {
	Restaurant.find({}, (error, restaurantFromDB) => {
		if (error) {
			next(error);
		} else {
			res.status(200).json(restaurantFromDB);
		}
	});
});

// EATERS - DELETE (Deleting all eaters and restaurants)

// Here I added another feature: I also delete the groups collection.
// This was made in order to completely restart the app when you delete your lists
// of eaters & restaurants and be able again to create new groups from zero.
// So the only remaining collection left is the one called OldLeaders, in order to
// guarantee they will not be repeated the next week.

router.delete('/eaters', (req, res, next) => {
	oldLeaders()
	Restaurant.remove({}, function (error, restaurant) {
		if (error) {
			next(error);
		} else {
			Eater.remove({}, function (error, eater) {
				if (error) {
					next(error);
				} else {

					Group.remove({}, function (error, group) {
						if (error) {
							next(error);
						} else {
							res.status(200).json({
								message: "eaters and restaurants removed"
							});
						}
					});
				}
			});
		}
	});
});

//new feature: I made both a specific delete groups route and when I 
//delete restaurants and eaters I also delete groups because I don't need them 
// anymore. I created both just for convenience.

router.delete('/create_groups', (req, res, next) => {
	oldLeaders()
	Group.remove({}, function (error, group) {
		if (error) {
			next(error);
		}
	});
	res.status(200).send({
		message: "groups removed"
	});
});

// CREATE_GROUPS - POST
// New feature: Down here I decided to add a var called minGroup
// to set not just the groups maximun but the minimun of persons per group.
//so if you want to make groups with a minimun of 4 persons, just change 0 to 4.
// and the magic is created ^^

router.post('/create_groups', (req, res, next) => {

	Group.find({}, (error, groupsFromDB) => {
		var groups = [];
		if (groupsFromDB.length > 0) {
			res.status(412).json({
				"message": "groups already created"
			})
		} else {

			var metidos = 0;
			var randomEatersList;
			var minGroup = 0;
			var maxGroup = 7;
			var restaurants = 0;
			var eatersPerGroup = minGroup - 1;
			var restOfEaters;

			Restaurant.find({}, (error, restaurantFromDB) => {

				Eater.find({}, (error, eatersFromDB) => {

					randomEatersList = random(eatersFromDB);

					while (minGroup > eatersPerGroup) {
						if (eatersPerGroup === -1) {
							restaurants = restaurantFromDB.length
							eatersPerGroup = Math.floor(eatersFromDB.length / restaurants)
							restOfEaters = eatersFromDB.length % restaurants
						} else {

							restaurants--;
							eatersPerGroup = Math.floor(eatersFromDB.length / restaurants)
							restOfEaters = eatersFromDB.length % restaurants
							if (eatersFromDB.length / restaurants > maxGroup) {
								console.log("NO SE PUEDE ACEPTAR EL MINIMO PARA GENERAR LOS GRUPOS")
								restaurants++;
								eatersPerGroup = Math.floor(eatersFromDB.length / restaurants)
								restOfEaters = eatersFromDB.length % restaurants
								minGroup--;
							}
						}
					}
					var bar = -1;

					OldLeader.find({}, (error, oldFromDB) => {
						while (metidos < (randomEatersList.length - restOfEaters)) {
							var lider = false;
							var meter;
							var control = 0;
							var personas = [];
							while (control < eatersPerGroup) {
								if (control === 0) {
									bar++;
								}
								if (lider == false) {
									if (oldFromDB.length > 0) {
										if (noLider(randomEatersList[metidos].name, oldFromDB[oldFromDB.length - 1].leaders)) {
											meter = randomEatersList[metidos].name;
										}
									} else {
										meter = randomEatersList[metidos].name;
									}
								}
								personas.push(randomEatersList[metidos].name)
								metidos++;
								control++;
							}
							if (restOfEaters > 0) {

								personas.push(randomEatersList[metidos].name)
								metidos++;
								restOfEaters--;
							}


							const newGroup = new Group({
								leader: meter,
								eaters: personas,
								restaurant: restaurantFromDB[bar].name
							});

							groups.push(newGroup)


							newGroup.save((error) => {

								if (error) {
									next(error);
								}
							})
						}
						res.status(200).json(groups)
					})
				})
			})

		}
	});

});

function noLider(nombre, groupsFromDB) {
	var solucion = true;
	//extra:poner error caso extremo 
	for (var b = 0; b < groupsFromDB.length; b++) {

		if (groupsFromDB[b] == nombre) {
			solucion = false;
		}

	}
	return solucion;

}

// /groups - GET

router.get('/groups', (req, res, next) => {
	Group.find({}, (error, groupsFromDB) => {
		if (error) {
			next(error);
		} else {
			res.status(200).json(groupsFromDB);
		}
	});
});




module.exports = router;

//Nuevas features sugeridas:

//1)gestionar cuando no hay grupos que no se pueda hacer un create groups y salga
//mensaje diciendo que no hay eaters y restaurants