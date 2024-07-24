const boardElement = document.getElementById("board");
const resultElement = document.getElementById("result");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Create the Tic Tac Toe board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.dataset.index = i;
  cell.addEventListener("click", handleCellClick);
  boardElement.appendChild(cell);
}

// Handle cell click event
function handleCellClick(event) {
  const index = event.target.dataset.index;
  if (board[index] === "" && gameActive) {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkWin();
    togglePlayer();
  }
}

// Check for a win
function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns

    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      resultElement.textContent = `${currentPlayer} is the WINNER! \u{1F389}`;
      resultElement.classList.add("show");
      return;
    }
  }

  if (!board.includes("")) {
    gameActive = false;
    resultElement.textContent = "It's a DRAW! \u{1F91D}";
    resultElement.classList.add("show");
  }
}

// Switch players
function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Restart the game
restartButton.addEventListener("click", restartGame);

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  resultElement.textContent = "";
  resultElement.classList.remove("show");
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
  });
}
