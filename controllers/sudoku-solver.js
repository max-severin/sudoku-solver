const SIZE = 9;
const SIZE_SQRT = Math.sqrt(SIZE);
const SIZE_POW_2 = Math.pow(SIZE, 2);

class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.length !== SIZE_POW_2) {
      throw new Error('Expected puzzle to be 81 characters long');
    }

    if (!/^[0-9.]+$/.test(puzzleString)) {
      throw new Error('Invalid characters in puzzle');
    }

    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const current = row * SIZE - SIZE + column - 1;

    if (puzzleString[current] === value) {
      return true;
    }

    const rowString = puzzleString.slice(row * SIZE - SIZE, row * SIZE);

    return !rowString.includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const current = row * SIZE - SIZE + column - 1;

    if (puzzleString[current] === value) {
      return true;
    }

    let colString = puzzleString
                      .slice(column - 1, column)
                      .concat(
                        puzzleString
                          .slice(column)
                          .split('')
                          .filter(
                            (x, i) => (i + 1) % 9 === 0
                          ).join('')
                      );

    return !colString.includes(value);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const current = row * SIZE - SIZE + column - 1;

    if (puzzleString[current] === value) {
      return true;
    }

    let thisIndex, fromRow, toRow, fromColumn, toColumn, regionString = '';

    for (let i = row; i <= SIZE; i++) {
      if (i % SIZE_SQRT === 0) {
        toRow = i;
        break;
      }
    }

    for (let i = column; i <= SIZE; i++) {
      if (i % SIZE_SQRT === 0) {
        toColumn = i;
        break;
      }
    }
    
    fromRow = toRow - SIZE_SQRT;
    fromColumn = toColumn - SIZE_SQRT;

    for (let i = fromRow + 1; i <= toRow; i++) {
      for (let j = fromColumn + 1; j <= toColumn; j++) {
        thisIndex = i * SIZE - SIZE + j - 1;

        regionString += puzzleString.slice(thisIndex, thisIndex + 1);
      }
    }

    return !regionString.includes(value);
  }

  getEmptyCell(puzzleString) {
    let current;

    for (let i = 1; i <= SIZE; i++) {
      for (let j = 1; j <= SIZE; j++) {
        current = i * SIZE - SIZE + j - 1;

        if (puzzleString[current] === '.') {
          return [i, j];
        }
      }
    }

    return [-1, -1];

  }

  solve(puzzleString) {
    this.validate(puzzleString);

    let [row, column] = this.getEmptyCell(puzzleString);
    let current = row * SIZE - SIZE + column - 1;

    if (row === -1) {
      return puzzleString;
    }

    for (let i = 1; i <= 9; i++) {
      if (this.checkRowPlacement(puzzleString, row, column, i) 
          && this.checkColPlacement(puzzleString, row, column, i)
          && this.checkRegionPlacement(puzzleString, row, column, i)) {
            puzzleString = puzzleString.slice(0, current).concat(i).concat(puzzleString.slice(current + 1));

            puzzleString = this.solve(puzzleString);
      }
    }

    if (this.getEmptyCell(puzzleString)[0] !== -1) {
      puzzleString = puzzleString.slice(0, current).concat('.').concat(puzzleString.slice(current + 1));
    }    

    return puzzleString;
  }
}

module.exports = SudokuSolver;
