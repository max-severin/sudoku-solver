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
    let colString = puzzleString.slice(column - 1, column)
                      .concat(puzzleString.slice(column).split('').filter((x, i) => (i + 1) % 9 === 0).join(''));

    colString = colString.slice(0, row - 1).concat(colString.slice(row));

    return !colString.includes(value);
  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

