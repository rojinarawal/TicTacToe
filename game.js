let boxes = document.querySelectorAll(".box");
let restartBtn = document.querySelector("#restart-btn");
let msgBox = document.querySelector(".msg-box");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
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
    if (turnO) {
      box.innerHTML = "O";
      turnO = false;
    } else {
      box.innerHTML = "X";
      turnO = true;
    }
    box.disabled = true;

    moves++;
    if (checkWinner()) {
      return;
    }
    if (moves === 9) {
      checkDraw();
    }
  });
});

const showWinner = (winner) => {
  msg.innerText = `Winner is ${winner}`;
  msgBox.classList.remove("hide");
  endGame();
};

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
  turnO = true;
  enableBoxes();
  msgBox.classList.add("hide");
  moves = 0;
};

restartBtn.addEventListener("click", resetGame);
