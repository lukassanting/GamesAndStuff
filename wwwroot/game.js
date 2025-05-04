// 1. Set up the initial game state
let gameState = {
    board: Array(9).fill(null),
    currentPlayer: "X",
    winner: null,
}

// 2. Get references to the DOM elements
const board = document.getElementById("board");
const status = document.getElementById("status");

async function fetchGameState() {
    const response = await fetch('/Game');
    gameState = await response.json();
    renderBoard();
}

function renderBoard(){
    board.innerHTML = "";

    gameState.board.forEach((cellValue, idx) => {
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";
        cellDiv.textContent = cellValue || "";
        cellDiv.onclick = () => {
            if (!cellValue && !gameState.winner) makeMove(idx);
        };
        board.appendChild(cellDiv);
    });
    status.textContent = gameState.winner 
        ? `Winner: ${gameState.winner}`
        : `Current Player: ${gameState.currentPlayer}`;
}

async function makeMove(index){
    const response = await fetch(`/Game/move?position=${index}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(gameState),
    });
    gameState = await response.json();
    renderBoard();
}

fetchGameState();
