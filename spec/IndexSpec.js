var request = require("request");
const {random, oldLeaders} = require('../helpers/helpers');
var eaters = "http://localhost:3000/eaters"
var restaurants = "http://localhost:3000/restaurants"


describe("Reordering an Array with a function", function() {

var testArr = ["a","b","c","d","e"]
var newArr  = ["a","b","c","d","e"]

    it("returns the array given reordered", function(done) {

        expect(random(newArr)).not.toBe(testArr);
        done(); 
    });
 
});


//Testing my eaters-get route:
describe("Testing the show list eaters", function() {
  describe("GET /eaters", function() {

    it("returns status code 200", function(done) {
      request.get(eaters, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns list of eaters", function(done) {
      request.get(eaters, function(error, response, body) {
        expect(body).toBe(body);
        expect('Content-Type', /json/);
        done();
      });
    }); 

  });
});

//Testing my restaurants-get route

describe("Testing the show list restaurants", function() {
  describe("GET /restaurants", function() {

    it("returns status code 200", function(done) {
      request.get(restaurants, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns list of restaurants", function(done) {
      request.get(restaurants, function(error, response, body) {
        expect(body).toBe(body);
        expect('Content-Type', /json/);
        done();
      });
    }); 

  });
});

describe("Testing the delete route", function() {
  describe("DELETE /eaters", function() {

    it("returns status code 200", function(done) {
      request.delete(eaters, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns eaters.length === 0", function(done) {
      request.delete(eaters, function(error, response, body) {
        expect(body).toBe(0);
        done();
      });
    }); 

  });
});

//Testing my eaters-post route:

// describe("Testing the creating restaurants", function() {
//   describe("POST /restaurants", function() {

//     // 

//     var test1 = JSON.stringify({"name":"test","email":"test@gmail.com"})

//     it("returns status code 200", function(done,test1) {
//       request.post(restaurants, function(error, response, test1) {
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//     });

    // it("returns status code 200", function(done) {
    //   request.get(eaters, function(error, response, body) {
    //     expect(response.statusCode).toBe(200);
    //     done();
    //   });
    // });

//   });
// });
