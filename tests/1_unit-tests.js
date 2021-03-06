const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {

  test('Logic handles a valid puzzle string of 81 characters', function (done) {
    let testString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isTrue(solver.validate(testString));

    done();
  });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function (done) {
    let errorMessage, testString;

    testString = 'a.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    try {
      solver.validate(testString);
    } catch(error) {
      errorMessage = error.message;
    }
    assert.equal(errorMessage, 'Invalid characters in puzzle');

    testString = '*.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    try {
      solver.validate(testString);
    } catch(error) {
      errorMessage = error.message;
    }
    assert.equal(errorMessage, 'Invalid characters in puzzle');

    testString = '-.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    try {
      solver.validate(testString);
    } catch(error) {
      errorMessage = error.message;
    }
    assert.equal(errorMessage, 'Invalid characters in puzzle');

    done();
  });

  test('Logic handles a puzzle string that is not 81 characters in length', function (done) {
    let errorMessage, testString;

    testString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
    try {
      solver.validate(testString);
    } catch(error) {
      errorMessage = error.message;
    }
    assert.equal(errorMessage, 'Expected puzzle to be 81 characters long');

    testString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37..';
    try {
      solver.validate(testString);
    } catch(error) {
      errorMessage = error.message;
    }
    assert.equal(errorMessage, 'Expected puzzle to be 81 characters long');

    done();
  });

  test('Logic handles a valid row placement', function (done) {
    let testString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

    assert.isTrue(solver.checkRowPlacement(testString, 1, 2, 3));
    assert.isTrue(solver.checkRowPlacement(testString, 2, 5, 8));
    assert.isTrue(solver.checkRowPlacement(testString, 4, 3, 8));
    assert.isTrue(solver.checkRowPlacement(testString, 7, 4, 9));

    done();
  });

  test('Logic handles an invalid row placement', function (done) {
    let testString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

    assert.isFalse(solver.checkRowPlacement(testString, 1, 1, 2));
    assert.isFalse(solver.checkRowPlacement(testString, 1, 2, 2));
    assert.isFalse(solver.checkRowPlacement(testString, 1, 3, 4));
    assert.isFalse(solver.checkRowPlacement(testString, 4, 2, 1));

    done();
  });

  test('Logic handles a valid column placement', function (done) {
    let testString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

    assert.isTrue(solver.checkColPlacement(testString, 2, 2, 4));
    assert.isTrue(solver.checkColPlacement(testString, 3, 4, 2));
    assert.isTrue(solver.checkColPlacement(testString, 4, 7, 1));
    assert.isTrue(solver.checkColPlacement(testString, 5, 9, 2));

    done();
  });

  test('Logic handles an invalid column placement', function (done) {
    let testString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

    assert.isFalse(solver.checkColPlacement(testString, 1, 1, 2));
    assert.isFalse(solver.checkColPlacement(testString, 3, 2, 6));
    assert.isFalse(solver.checkColPlacement(testString, 4, 2, 2));
    assert.isFalse(solver.checkColPlacement(testString, 8, 9, 7));

    done();
  });

  test('Logic handles a valid region (3x3 grid) placement', function (done) {
    let testString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

    assert.isTrue(solver.checkRegionPlacement(testString, 1, 7, 6));
    assert.isTrue(solver.checkRegionPlacement(testString, 2, 8, 1));
    assert.isTrue(solver.checkRegionPlacement(testString, 6, 4, 7));
    assert.isTrue(solver.checkRegionPlacement(testString, 8, 8, 2));

    done();
  });

  test('Logic handles an invalid region (3x3 grid) placement', function (done) {
    let testString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

    assert.isFalse(solver.checkRegionPlacement(testString, 1, 2, 1));
    assert.isFalse(solver.checkRegionPlacement(testString, 2, 7, 4));
    assert.isFalse(solver.checkRegionPlacement(testString, 4, 3, 3));
    assert.isFalse(solver.checkRegionPlacement(testString, 8, 8, 1));

    done();
  });

  test('Valid puzzle strings pass the solver', function (done) {
    let testString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    let response = solver.solve(testString);

    assert.isString(response);
    assert.notEqual(response, testString);

    done();
  });

  test('Invalid puzzle strings fail the solver', function (done) {
    let errorMessage, testString, response;

    try {
      testString = '';
      response = solver.solve(testString);
    } catch(error) {
      errorMessage = error.message;
    }
    assert.equal(errorMessage, 'Expected puzzle to be 81 characters long');

    try {
      testString = 'a.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      response = solver.solve(testString);
    } catch(error) {
      errorMessage = error.message;
    }
    assert.equal(errorMessage, 'Invalid characters in puzzle');

    try {
      testString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
      response = solver.solve(testString);
    } catch(error) {
      errorMessage = error.message;
    }
    assert.equal(errorMessage, 'Expected puzzle to be 81 characters long');

    done();
  });

  test('Solver returns the expected solution for an incomplete puzzle', function (done) {    
    let testString, solvedString;

    testString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    solvedString = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
    assert.equal(solver.solve(testString), solvedString);

    testString = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
    solvedString = '568913724342687519197254386685479231219538467734162895926345178473891652851726943';
    assert.equal(solver.solve(testString), solvedString);
    
    testString = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';
    solvedString = '218396745753284196496157832531672984649831257827549613962415378185763429374928561';
    assert.equal(solver.solve(testString), solvedString);
    
    testString = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
    solvedString = '473891265851726394926345817568913472342687951197254638734162589685479123219538746';
    assert.equal(solver.solve(testString), solvedString);
    
    testString = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
    solvedString = '827549163531672894649831527496157382218396475753284916962415738185763249374928651';
    assert.equal(solver.solve(testString), solvedString);

    done();
  });

});
