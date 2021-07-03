const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  // suite("POST request to /api/solve", function () {

  //   test("Solve a puzzle with valid puzzle string", function (done) {
  //     //
  //   });

  //   test("Solve a puzzle with missing puzzle string", function (done) {
  //     //
  //   });

  //   test("Solve a puzzle with invalid characters", function (done) {
  //     //
  //   });

  //   test("Solve a puzzle with incorrect length", function (done) {
  //     //
  //   });

  //   test("Solve a puzzle that cannot be solved", function (done) {
  //     //
  //   });

  // });

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

