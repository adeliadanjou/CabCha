
const Group = require('../models/group');
const OldLeader = require('../models/oldLeader');

function random(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    function algoritmo() {
      var long = [];
      Restaurant.find({}, (error, restaurantFromDB) => {

        azar(Eater).find({}, (error, eatersFromDB) => {
          long.push(restaurantFromDB.length)
          long.push(eatersFromDB.length)
          return long[1]

        })
      });
    }
 
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function oldLeaders(){
	Group.find({}, (error, groupsFromDB) => {
		if (error) {
			next(error);
		} else {
        if(groupsFromDB.length > 0){

      var myOldLeaders = groupsFromDB.map(group => {
        return group.leader;
      });
     
      const newOldLeader = new OldLeader({
        leaders: myOldLeaders,
      });
    
      newOldLeader.save((error) => {
        if (error) {
          next(error);
        } else {
         console.log("lideres guardados")
        }
      });
    } 
   
		}
	});
}



module.exports = { random, oldLeaders };
