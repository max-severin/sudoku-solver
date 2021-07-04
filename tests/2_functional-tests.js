const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  suite("POST request to /api/solve", function () {    

    test("Solve a puzzle with valid puzzle string", function (done) {
      const testData = {
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
      };

      chai
        .request(server)
        .post('/api/solve')
        .send(testData)
        .end(function (err, res) {
          assert.equal(res.status, 200);  

          assert.property(res.body, 'solution');
          assert.equal(res.body.solution, '135762984946381257728459613694517832812936745357824196473298561581673429269145378');

          done();
        });
    });

    test("Solve a puzzle with missing puzzle string", function (done) {
      const testData = {
        puzzle: '',
      };

      chai
        .request(server)
        .post('/api/solve')
        .send(testData)
        .end(function (err, res) {
          assert.equal(res.status, 200);  

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Required field missing');

          done();
        });
    });

    test("Solve a puzzle with invalid characters", function (done) {
      const testData = {
        puzzle: 'ABC..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
      };

      chai
        .request(server)
        .post('/api/solve')
        .send(testData)
        .end(function (err, res) {
          assert.equal(res.status, 200);  

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Invalid characters in puzzle');

          done();
        });
    });

    test("Solve a puzzle with incorrect length", function (done) {
      const testData = {
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.',
      };

      chai
        .request(server)
        .post('/api/solve')
        .send(testData)
        .end(function (err, res) {
          assert.equal(res.status, 200);  

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');

          done();
        });
    });

    // test("Solve a puzzle that cannot be solved", function (done) {
    //   //
    // });

  });

  // suite("POST request to /api/check", function () {

  //   test("Check a puzzle placement with all fields", function (done) {
  //     //
  //   });

  //   test("Check a puzzle placement with single placement conflict", function (done) {
  //     //
  //   });

  //   test("Check a puzzle placement with multiple placement conflicts", function (done) {
  //     //
  //   });

  //   test("Check a puzzle placement with all placement conflicts", function (done) {
  //     //
  //   });

  //   test("Check a puzzle placement with missing required fields", function (done) {
  //     //
  //   });

  //   test("Check a puzzle placement with invalid characters", function (done) {
  //     //
  //   });

  //   test("Check a puzzle placement with incorrect length", function (done) {
  //     //
  //   });

  //   test("Check a puzzle placement with invalid placement coordinate", function (done) {
  //     //
  //   });

  //   test("Check a puzzle placement with invalid placement value", function (done) {
  //     //
  //   });

  // });

});

