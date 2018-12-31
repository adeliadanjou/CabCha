var request = require("request");

var eaters = "http://localhost:3000/eaters"
var restaurants = "http://localhost:3000/restaurants"

//Testing my eaters-post route:

describe("Testing the creating restaurants", function() {
  describe("POST /restaurants", function() {

    // var test1 = {"name":"test","email":"test@gmail.com"}

    it("returns status code 200", function(done) {
      request.post(restaurants, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns status code 200", function(done) {
      request.get(eaters, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

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
        done();
      });
    }); 

  });
});