const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {

  test('Logic handles a valid puzzle string of 81 characters', function () {
    let testString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isTrue(solver.validate(testString));
  });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function () {
    let testString = 'a.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isFalse(solver.validate(testString));

    testString = '*.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isFalse(solver.validate(testString));

    testString = '-.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isFalse(solver.validate(testString));
  });

  test('Logic handles a puzzle string that is not 81 characters in length', function () {
    let testString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
    assert.isFalse(solver.validate(testString));

    testString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37..';
    assert.isFalse(solver.validate(testString));
  });

  // test('Logic handles a valid row placement', function () {
  //   //
  // });

  // test('Logic handles an invalid row placement', function () {
  //   //
  // });

  // test('Logic handles a valid column placement', function () {
  //   //
  // });

  // test('Logic handles an invalid column placement', function () {
  //   //
  // });

  // test('Logic handles a valid region (3x3 grid) placement', function () {
  //   //
  // });

  // test('Logic handles an invalid region (3x3 grid) placement', function () {
  //   //
  // });

  // test('Valid puzzle strings pass the solver', function () {
  //   //
  // });

  // test('Invalid puzzle strings fail the solver', function () {
  //   //
  // });

  // test('Solver returns the expected solution for an incomplete puzzle', function () {
  //   //
  // });

});
