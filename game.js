//Accessing the elements
let boxes = document.querySelectorAll(".box");
let restartBtn = document.querySelector("#restart-btn");
let msgBox = document.querySelector(".msg-box");
let msg = document.querySelector("#msg");

let turnO = true; //Boolean to keep track of whose turn it is (true for player O, false for player X)

// Define the winning patterns for the game (tic-tac-toe)
const winning_patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let moves = 0;

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Check whose turn it is and update the box accordingly
    if (turnO) {
      box.innerHTML = "O";
      turnO = false;
    } else {
      box.innerHTML = "X";
      turnO = true;
    }
    box.disabled = true; // Disable the box to prevent further clicks

    moves++;
    if (checkWinner()) {
      // Check if there is a winner
      return;
    }
    if (moves === 9) {
      // Check if the game is a draw
      checkDraw();
    }
  });
});

/**
 * Show the winner of the game
 * @param {string} winner
 */
const showWinner = (winner) => {
  msg.innerText = `Winner is ${winner}`;
  msgBox.classList.remove("hide");
  endGame();
};

/**
 * Check for a winner
 * @returns {boolean}
 */
const checkWinner = () => {
  for (let pattern of winning_patterns) {
    let position1value = boxes[pattern[0]].innerText;
    let position2value = boxes[pattern[1]].innerText;
    let position3value = boxes[pattern[2]].innerText;

    if (position1value != "" && position2value != "" && position3value != "") {
      if (
        position1value === position2value &&
        position2value === position3value
      ) {
        showWinner(position1value);
        return true;
      }
    }
  }
  return false;
};

const checkDraw = () => {
  if (moves === 9) {
    msg.innerText = "Draw Game!";
    msgBox.classList.remove("hide");
    endGame();
  }
};
const endGame = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const resetGame = () => {
  //Reset the game state
  turnO = true;
  enableBoxes();
  msgBox.classList.add("hide");
  moves = 0;
};

restartBtn.addEventListener("click", resetGame);
