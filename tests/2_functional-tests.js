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

    test("Solve a puzzle that cannot be solved", function (done) {
      const testData = {
        puzzle: '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
      };

      chai
        .request(server)
        .post('/api/solve')
        .send(testData)
        .end(function (err, res) {
          assert.equal(res.status, 200);

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Puzzle cannot be solved');

          done();
        });
    });

  });

  suite("POST request to /api/check", function () {

    test("Check a puzzle placement with all fields", function (done) {
      const testData = {
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: 'C4',
        value: '4',
      };

      chai
        .request(server)
        .post('/api/check')
        .send(testData)
        .end(function (err, res) {
          assert.equal(res.status, 200);  

          assert.property(res.body, 'valid');
          assert.isTrue(res.body.valid);

          done();
        });
    });

    test("Check a puzzle placement with single placement conflict", function (done) {
      const testData = {
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: 'H5',
        value: '2',
      };

      chai
        .request(server)
        .post('/api/check')
        .send(testData)
        .end(function (err, res) {
          assert.equal(res.status, 200);  

          assert.property(res.body, 'valid');
          assert.isFalse(res.body.valid);

          assert.property(res.body, 'conflict');
          assert.isArray(res.body.conflict);
          assert.include(res.body.conflict, 'column');

          done();
        });
    });

    test("Check a puzzle placement with multiple placement conflicts", function (done) {
      const testData = {
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: 'C4',
        value: '1',
      };

      chai
        .request(server)
        .post('/api/check')
        .send(testData)
        .end(function (err, res) {
          assert.equal(res.status, 200);  

          assert.property(res.body, 'valid');
          assert.isFalse(res.body.valid);

          assert.property(res.body, 'conflict');
          assert.isArray(res.body.conflict);
          assert.include(res.body.conflict, 'column');
          assert.include(res.body.conflict, 'region');

          done();
        });
    });

    test("Check a puzzle placement with all placement conflicts", function (done) {
      const testData = {
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: 'H5',
        value: '1',
      };

      chai
        .request(server)
        .post('/api/check')
        .send(testData)
        .end(function (err, res) {
          assert.equal(res.status, 200);  

          assert.property(res.body, 'valid');
          assert.isFalse(res.body.valid);

          assert.property(res.body, 'conflict');
          assert.isArray(res.body.conflict);
          assert.include(res.body.conflict, 'row');
          assert.include(res.body.conflict, 'column');
          assert.include(res.body.conflict, 'region');

          done();
        });
    });

    test("Check a puzzle placement with missing required fields", function (done) {
      const testData = {
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        value: '1',
      };

      chai
        .request(server)
        .post('/api/check')
        .send(testData)
        .end(function (err, res) {
          assert.equal(res.status, 200);  

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Required field(s) missing');

          done();
        });
    });

    test("Check a puzzle placement with invalid characters", function (done) {
      const testData = {
        puzzle: 'ABC..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: 'A1',
        value: '1',
      };

      chai
        .request(server)
        .post('/api/check')
        .send(testData)
        .end(function (err, res) {
          assert.equal(res.status, 200);  

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Invalid characters in puzzle');

          done();
        });
    });

    test("Check a puzzle placement with incorrect length", function (done) {
      const testData = {
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....',
        coordinate: 'A1',
        value: '1',
      };

      chai
        .request(server)
        .post('/api/check')
        .send(testData)
        .end(function (err, res) {
          assert.equal(res.status, 200);  

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');

          done();
        });
    });

    test("Check a puzzle placement with invalid placement coordinate", function (done) {
      const testData = {
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: 'Z11',
        value: '1',
      };

      chai
        .request(server)
        .post('/api/check')
        .send(testData)
        .end(function (err, res) {
          assert.equal(res.status, 200);  

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Invalid coordinate');

          done();
        });
    });

    test("Check a puzzle placement with invalid placement value", function (done) {
      const testData = {
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: 'A1',
        value: '11',
      };

      chai
        .request(server)
        .post('/api/check')
        .send(testData)
        .end(function (err, res) {
          assert.equal(res.status, 200);  

          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Invalid value');

          done();
        });
    });

  });

});

