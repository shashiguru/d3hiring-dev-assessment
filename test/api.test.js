var supertest = require("supertest");
var should = require("should");
var mockData= require('./mock/data');

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// Unit test begin

describe("unit test for API",function(){

  // #1 should return health check

  it("should return 200 status code with response body ",function(done){

    // calling health check api
    server
    .get("/api")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
        console.log(res.body.message);
      // HTTP status should be 200
      res.status.should.equal(200);
      // response message should be "API is healthy!"
       res.body.message.should.equal("API is healthy!");
      done();
    });
  });

   // #2 should create registration

   it("should create and return 204 status code ",function(done){

    // calling register api
    server
    .post("/api/register", )
    .send(mockData.register)
    .set('Accept','application/json')
    .set('Content-Type','application/json')
    .expect("Content-type",/json/)
    .expect(204) 
    .end(function(err,res){
      // HTTP status should be 204
      res.status.should.equal(204);
      done();
    });
  });

  // #3 should retrieve common students

  it("should retrieve and return 200 status code ",function(done){

    // calling health check api
    server
    .get(`/api/commonstudents?${mockData.commonStudentsRequest}`)
    .expect("Content-type",/json/)
    .expect(200) 
    .end(function(err,res){
        console.log(res.status)
      // HTTP status should be 200
      res.status.should.equal(200);
      // response message should have common students
      res.body.message.should.equal(mockData.commonStudentsResponse);
      done();
    });
  });

   // #4 should suspend student

   it("should suspend and return 204 status code ",function(done){

    // calling suspend api
    server
    .post("/api/suspend", )
    .send(mockData.suspend)
    .set('Accept','application/json')
    .set('Content-Type','application/json')
    .expect("Content-type",/json/)
    .expect(204) 
    .end(function(err,res){
      // HTTP status should be 204
      res.status.should.equal(204);
      done();
    });
  });

  // #5 should retrieve recipients

  it("should retrieve recipients and return 204 status code ",function(done){

    // calling retrievefornotifications api
    server
    .post("/api/retrievefornotifications")
    .send(mockData.notificationsRequest)
    .set('Accept','application/json')
    .set('Content-Type','application/json')
    .expect("Content-type",/json/)
    .expect(204) 
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // response message should have recipients
      res.body.message.should.equal(mockData.notificationsResponse);
      done();
    });
  });
});