export const GRID_SIZE = 4;

// Initialize board with empty cells
export function initializeBoard() {
  let board = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(null));

  return addNewTile(addNewTile(board)); // Add two tiles at the start
}

// Add a new tile (2 or 4) at a random empty position (No 0s or nulls)
export function addNewTile(board) {
  let newBoard = board.map(row => [...row]);
  let emptyCells = [];

  // Find all empty cells
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (newBoard[row][col] === null) {
        emptyCells.push({ row, col });
      }
    }
  }

  // If no empty cells, return the board as is
  if (emptyCells.length === 0) return newBoard;

  // Select a random empty cell and place 2 or 4
  let { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  newBoard[row][col] = Math.random() < 0.9 ? 2 : 4; // Only 2 or 4, never 0

  return newBoard;
}

// Function to move and merge tiles
export function moveTiles(board, direction, score) {
  let newBoard = board.map(row => [...row]);
  let moved = false;
  let newScore = score;

  const moveRow = (row) => {
    let filteredRow = row.filter(val => val !== null);
    let newRow = [];

    for (let i = 0; i < filteredRow.length; i++) {
      if (filteredRow[i] === filteredRow[i + 1]) {
        newRow.push(filteredRow[i] * 2);
        newScore += filteredRow[i] * 2;
        i++;
      } else {
        newRow.push(filteredRow[i]);
      }
    }

    while (newRow.length < GRID_SIZE) newRow.push(null);
    return newRow;
  };

  if (direction === "left") {
    for (let i = 0; i < GRID_SIZE; i++) {
      let newRow = moveRow(newBoard[i]);
      if (newRow.toString() !== newBoard[i].toString()) moved = true;
      newBoard[i] = newRow;
    }
  } else if (direction === "right") {
    for (let i = 0; i < GRID_SIZE; i++) {
      let newRow = moveRow(newBoard[i].reverse()).reverse();
      if (newRow.toString() !== newBoard[i].toString()) moved = true;
      newBoard[i] = newRow;
    }
  } else if (direction === "up") {
    for (let col = 0; col < GRID_SIZE; col++) {
      let column = newBoard.map(row => row[col]);
      let newCol = moveRow(column);
      if (newCol.toString() !== column.toString()) moved = true;
      for (let row = 0; row < GRID_SIZE; row++) newBoard[row][col] = newCol[row];
    }
  } else if (direction === "down") {
    for (let col = 0; col < GRID_SIZE; col++) {
      let column = newBoard.map(row => row[col]).reverse();
      let newCol = moveRow(column).reverse();
      if (newCol.toString() !== column.toString()) moved = true;
      for (let row = 0; row < GRID_SIZE; row++) newBoard[row][col] = newCol[row];
    }
  }

  return moved ? { board: addNewTile(newBoard), score: newScore } : { board, score };
}

// Check if the game is over
export function checkGameOver(board) {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col] === null) return false;
      if (col < GRID_SIZE - 1 && board[row][col] === board[row][col + 1]) return false;
      if (row < GRID_SIZE - 1 && board[row][col] === board[row + 1][col]) return false;
    }
  }
  return true;
}
