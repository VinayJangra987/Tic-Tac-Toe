let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;
let playerNames = { X: "", O: "" };

function startGame() {
  const xName = document.getElementById("playerX").value.trim();
  const oName = document.getElementById("playerO").value.trim();

  if (!xName || !oName) {
    alert("Please enter both names!");
    return;
  }

  playerNames.X = xName;
  playerNames.O = oName;

  document.getElementById("playerForm").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";

  renderBoard();
  updateTurnInfo();
}

function renderBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";
  board.forEach((cell, idx) => {
    const div = document.createElement("div");
    div.className = "cell";
    div.dataset.index = idx;
    div.innerText = cell;
    div.onclick = handleClick;
    boardDiv.appendChild(div);
  });
}

function handleClick(e) {
  const idx = e.target.dataset.index;
  if (!gameActive || board[idx] !== "") return;

  board[idx] = currentPlayer;
  renderBoard();

  if (checkWinner()) {
    gameActive = false;
    showPopup(`${playerNames[currentPlayer]} Wins! 🎉`);
    confetti();
    return;
  }

  if (board.every(cell => cell !== "")) {
    showPopup("It's a Draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurnInfo();
}

function updateTurnInfo() {
  document.getElementById("turnInfo").innerText = `Turn: ${playerNames[currentPlayer]} (${currentPlayer})`;
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] === currentPlayer && board[a] === board[b] && board[b] === board[c];
  });
}

function showPopup(message) {
  document.getElementById("popupMessage").innerText = message;
  document.getElementById("popup").style.display = "flex";
}

function restartGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  document.getElementById("popup").style.display = "none";
  renderBoard();
  updateTurnInfo();
}

// Confetti effect (simple)
function confetti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;
  const colors = ["#bb0000", "#ffffff"];

  (function frame() {
    const timeLeft = end - Date.now();
    if (timeLeft <= 0) return;
    for (let i = 0; i < 5; i++) {
      const conf = document.createElement("div");
      conf.style.position = "fixed";
      conf.style.left = Math.random() * window.innerWidth + "px";
      conf.style.top = Math.random() * window.innerHeight + "px";
      conf.style.width = "10px";
      conf.style.height = "10px";
      conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      conf.style.borderRadius = "50%";
      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), duration);
    }
    requestAnimationFrame(frame);
  })();
}
