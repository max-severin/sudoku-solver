'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      try {
        // let solution = solver.solve(req.body.puzzle);
        
        res.status(200).json({
          // 
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

        if (!solution) {
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
