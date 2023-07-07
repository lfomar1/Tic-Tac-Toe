"use strict";
const ticTacToe = new TicTacToe();
ticTacToe.start();

function TicTacToe() {
  const gameBoard = new Board();
  const humanPlayer = new HumanPlayer(gameBoard);
  const computerPlayer = new ComputerPlayer(gameBoard);
  let turn = 0;

  this.start = function () {
    const config = { childList: true };
    const observer = new MutationObserver(() => takeTurn());
    gameBoard.positions.forEach((el) => observer.observe(el, config));
    takeTurn();
  };
  function takeTurn() {
    if (gameBoard.checkForWinner()) {
      return;
    }
    if (turn % 2 === 0) {
      humanPlayer.takeTurn();
    } else {
      computerPlayer.takeTurn();
    }
    turn++;
  }
}

function Board() {
  this.positions = Array.from(document.querySelectorAll(".data-field"));

  this.checkForWinner = function () {
    let winner = false;

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    const positions = this.positions;
    winningCombinations.forEach((winningCombo) => {
      const pos0InnerText = positions[winningCombo[0]].innerText;
      const pos1InnerText = positions[winningCombo[1]].innerText;
      const pos2InnerText = positions[winningCombo[2]].innerText;
      const isWinningCombo =
        pos0InnerText !== "" &&
        pos0InnerText === pos1InnerText &&
        pos1InnerText === pos2InnerText;
      if (isWinningCombo) {
        winner = true;
        winningCombo.forEach((index) => {
          positions[index].className += " winner";
        });
      }
    });

    return winner;
  };
}
function HumanPlayer(gameBoard) {
  this.takeTurn = function () {
    gameBoard.positions.forEach((el) =>
      el.addEventListener("click", handleTurnTaken)
    );
  };
  function handleTurnTaken(event) {
    event.target.innerText = "X";
    gameBoard.positions.forEach((el) =>
      el.removeEventListener("click", handleTurnTaken)
    );
  }
}
function ComputerPlayer(gameBoard) {
  this.takeTurn = function () {
    const availablePositions = gameBoard.positions.filter(
      (p) => p.innerText === ""
    );
    const move = Math.floor(Math.random() * availablePositions.length);
    availablePositions[move].innerText = "O";
  };
}

function restartPage() {
  location.reload();
}

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", restartPage);
