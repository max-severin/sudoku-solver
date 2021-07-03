class SudokuSolver {

  validate(puzzleString) {
    return /^[0-9|\.]{81}$/.test(puzzleString);
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const from = row * 9 - 9;
    const to = row * 9;
    const rowString = puzzleString.slice(from, from + column - 1)
                      .concat(puzzleString.slice(from + column, to));
                      
    return !rowString.includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

