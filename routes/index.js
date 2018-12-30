const express = require('express');
const router = express.Router();
const Eater = require('../models/eater');
const Restaurant = require('../models/restaurant');
const Group = require('../models/group');
const { azar } = require('../helpers/helpers');

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
      res.status(200);
    }
  });
});

// EATERS - GET
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
      res.status(200).json({ message: "created" });
    }
  });
});

// RESTAURANTS - GET

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

router.delete('/eaters', (req, res, next) => {

  Restaurant.remove({}, function (error, restaurant) {
    if (error) {
      next(error);
    } else {
      Eater.remove({}, function (error, eater) {
        if (error) {
          next(error);
        } else {
          res.status(200).json({ message: "Eaters and Restaurants removed" });
        }
      });
    }
  });
});


// CREATE_GROUPS - POST

router.post('/create_groups', (req, res, next) => {
	
  Group.find({}, (error, groupsFromDB) => {
    if(groupsFromDB.length>0) {res.status(403).json({
			"message": "groups already created"
		})}

else{
  var metidos = 0;
  var listapersonasaleatoria;
  
  var minimo = 0;

  var maximo = 7;
  var restaurantes = 0;
  var personasporgrupo = minimo - 1;
  var gentequesobra;

  Restaurant.find({}, (error, restaurantFromDB) => {

    Eater.find({}, (error, eatersFromDB) => {


      listapersonasaleatoria = azar(eatersFromDB);


      while (minimo > personasporgrupo) {
        if (personasporgrupo == -1) {
          restaurantes = restaurantFromDB.length
          personasporgrupo = Math.floor(eatersFromDB.length / restaurantes)
          gentequesobra = eatersFromDB.length % restaurantes
        }
        else {

          restaurantes--;
          personasporgrupo = Math.floor(eatersFromDB.length / restaurantes)
          gentequesobra = eatersFromDB.length % restaurantes
          if (eatersFromDB.length / restaurantes > maximo) {
            console.log("NO SE PUEDE ACEPTAR EL MINIMO PARA GENERAR LOS GRUPOS")
            restaurantes++;
            personasporgrupo = Math.floor(eatersFromDB.length / restaurantes)
            gentequesobra = eatersFromDB.length % restaurantes
            minimo--;
          }
        }

      }


      // console.log("")
      // console.log("numero restaurantes :" + restaurantes)
      // console.log("numero personas :" + eatersFromDB.length)
      // console.log("minimo por grupo :" + personasporgrupo)
      // console.log("gente por grupo:" + personasporgrupo)
      // console.log("resto:" + gentequesobra)
      // console.log("")

      var bar = -1;
      while (metidos < (listapersonasaleatoria.length - gentequesobra)) {

        var control = 0;
				var personas=[];
				
        while (control < personasporgrupo) {
          if (control == 0) {
            bar++; 
          }
          personas.push(listapersonasaleatoria[metidos].name)
          metidos++;
          control++;
        }
        if (gentequesobra > 0) {
          
          personas.push(listapersonasaleatoria[metidos].name)
          metidos++;
          gentequesobra--;
        } 

//        console.log( restaurantFromDB[bar].name)//nombre del restaurante para dicho grupo
// console.log( personas )//el array

const newGroup  = new Group({
  leader: personas,
	eaters: personas,
  restaurant: restaurantFromDB[bar].name
});

newGroup.save((error,user) => {
  if (error) {
    next(error);
  } else {
    return 	Group.find({}, (error, groupsFromDB) => {
			if (error) {
				next(error);
			} else {
				res.status(200).json(groupsFromDB);
			}
		});;
  }
})

      }
    })
	})
	
}


})

});






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

