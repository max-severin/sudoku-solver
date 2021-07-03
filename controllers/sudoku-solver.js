const SIZE = 9;
const SIZE_SQRT = Math.sqrt(SIZE);
const SIZE_POW_2 = Math.pow(SIZE, 2);

class SudokuSolver {
  validate(puzzleString) {
    const regex = new RegExp(`^[0-9|\.]{${SIZE_POW_2}}$`);

    return regex.test(puzzleString);
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const from = row * SIZE - SIZE;
    const to = row * SIZE;
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
    const currentIndex = row * SIZE - SIZE + column - 1;
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

        if (thisIndex !== currentIndex) {
          regionString += puzzleString.slice(thisIndex, thisIndex + 1);
        }
      }
    }

    return !regionString.includes(value);
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

