// Get references to HTML elements by their IDs
const board = document.getElementById('board');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const resultModal = document.getElementById('resultModal');
const winnerText = document.getElementById('winnerText');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreDraw = document.getElementById('scoreDraw');

// Game state variables
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let scores = { X: 0, O: 0, draw: 0 };

// Create or Reset the game board
function createBoard() {
  board.innerHTML = '';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
  currentPlayerDisplay.textContent = currentPlayer;
}
// Called when a cell is clicked
function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || gameState[index]) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    gameActive = false;
    showModal("${currentPlayer} Wins!");
    scores[currentPlayer]++;
    updateScores();
  } else if (!gameState.includes('')) {
    gameActive = false;
    showModal("It's a Draw!");
    scores.draw++;
    updateScores();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.textContent = currentPlayer;
  }
}
// Check if there's a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]           // diaugnals
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}
// Show popup model with result message
function showModal(message) {
  winnerText.textContent = message;
  resultModal.style.display = 'flex';
}
// Close the popup model and restart board
function closeModal() {
  resultModal.style.display = 'none';
  createBoard();
}
// Reset the entire game,scores included
function resetGame() {
  scores = { X: 0, O: 0, draw: 0 };
  updateScores();
  createBoard();
}
// Update the scoreboard values in the HTML
function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreDraw.textContent = scores.draw;
}
// Start the game for the first time
createBoard();
// JS Complete 
