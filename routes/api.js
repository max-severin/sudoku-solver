'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  const rowMap = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, };
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      try {
        const conflict = [];
        const { puzzle, coordinate, value } = req.body;
        
        if (!puzzle || !coordinate || !value) {
          res.status(200).json({
            error: 'Required field(s) missing'
          });
        }  

        const coordinateArray = coordinate.split('');
        let [ row, column ] = coordinateArray;     
        column = parseInt(column);

        if (coordinateArray.length !== 2 || !/^[A-I]{1}$/.test(row) || !/^[1-9]{1}$/.test(column)) {
          res.status(200).json({
            error: 'Invalid coordinate'
          });
        }

        if (!/^[1-9]{1}$/.test(value)) {
          res.status(200).json({
            error: 'Invalid value'
          });
        }

        row = rowMap[row];

        solver.validate(puzzle);

        if (!solver.checkRowPlacement(puzzle, row, column, value)) {
          conflict.push('row');
        }

        if (!solver.checkColPlacement(puzzle, row, column, value)) {
          conflict.push('column');
        }

        if (!solver.checkRegionPlacement(puzzle, row, column, value)) {
          conflict.push('region');
        }

        if (conflict.length > 0) {
          res.status(200).json({
            valid: false,
            conflict,
          });
        }
        
        res.status(200).json({
          valid: true,
        });
      } catch(error) {
        res.status(200).json({
          error: error.message
        });
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      try {
        const { puzzle } = req.body;

        if (!puzzle) {
          res.status(200).json({
            error: 'Required field missing'
          });
        }

        let solution = solver.solve(puzzle);

        if (!solution || solution === puzzle) {
          res.status(200).json({
            error: 'Puzzle cannot be solved'
          });
        }
        
        res.status(200).json({
          solution
        });
      } catch(error) {
        res.status(200).json({
          error: error.message
        });
      }
    });
};
