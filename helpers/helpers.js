function azar(array) {
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









module.exports = { azar };
