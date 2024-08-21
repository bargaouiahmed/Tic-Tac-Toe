document.addEventListener('DOMContentLoaded', function(event) {
  const gameboard = document.getElementById('gameboard');
  let playerMove = false;
  let gameOver = false;
  let X = document.getElementById('X');
  let O = document.getElementById('O');

  function aiTurn() {
      if (gameOver) return;
      if (playerMove) {
          let grid = document.querySelectorAll('.cell');
          let gridArray = [];
          grid.forEach(x => {
              if (x.textContent === '') {
                  gridArray.push(x);
              }
          });

          if (gridArray.length === 0) return;

          let randomIndex = Math.floor(Math.random() * gridArray.length);
          gridArray[randomIndex].textContent = playerMove === 'X' ? 'O' : 'X';
          gridArray[randomIndex].classList.add("selected");

          // Check for AI win or tie after the AI's move
          if (checkForWin()) {
              alert('Computer wins!');
              if (playerMove === "X") {
                  O.innerText = `player O: ${parseInt(O.innerText.split(':')[1]) + 1}`;
              } else {
                  X.innerText = `player X: ${parseInt(X.innerText.split(':')[1]) + 1}`;
              }
              gameOver = true;
          } else if (checkForTie()) {
              alert('It\'s a tie!');
              X.innerText = `player X: ${parseInt(X.innerText.split(':')[1]) +0}`;
              O.innerText = `player O: ${parseInt(O.innerText.split(':')[1]) +0}`;
              gameOver = true;
          }
      }
  }

  X.addEventListener('click', () => {
      if (!gameOver) {
          playerMove = 'X';
      }
  });

  O.addEventListener('click', () => {
      if (!gameOver) {
          playerMove = 'O';
          aiTurn();
      }
  });

  gameboard.addEventListener('click', event => {
      if (gameOver) return;
      if (!playerMove) {
          alert('Please choose a Starting letter');
          return;
      }
      const cell = event.target;
      if (cell.classList.contains('cell') && cell.textContent === '') {
          cell.textContent = playerMove;
          cell.classList.add('selected');

          if (checkForWin()) {
              alert(`Player ${playerMove} wins!`);
              gameOver = true;
              if (playerMove === "X") {
                  X.innerText = `player X: ${parseInt(X.innerText.split(':')[1]) + 1}`;
              } else if (playerMove === "O") {
                  O.innerText = `player O: ${parseInt(O.innerText.split(':')[1]) + 1}`;
              }
          } else if (checkForTie()) {
              alert('It\'s a tie!');
              X.innerText = `player X: ${parseInt(X.innerText.split(':')[1]) + 0.5}`;
              O.innerText = `player O: ${parseInt(O.innerText.split(':')[1]) + 0.5}`;
              gameOver = true;
          } else {
              aiTurn();
          }
      }
  });

  function checkForWin() {
      const cells = document.querySelectorAll('.cell');
      const winningCombinations = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
      ];

      for (let i = 0; i < winningCombinations.length; i++) {
          const combination = winningCombinations[i];
          if (
              cells[combination[0]].textContent === cells[combination[1]].textContent &&
              cells[combination[1]].textContent === cells[combination[2]].textContent &&
              cells[combination[0]].textContent !== ''
          ) {
              return true;
          }
      }

      return false;
  }

  function checkForTie() {
      const cells = document.querySelectorAll('.cell');
      let allCellsFilled = true;
      cells.forEach(cell => {
          if (cell.textContent === '') {
              allCellsFilled = false;
          }
      });
      return allCellsFilled;
  }

  const reset = document.getElementById('reset');
  function resetGame() {
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
          cell.textContent = '';
          cell.classList.remove('selected');
      });
      gameOver = false;
      playerMove = false;
  }

  reset.addEventListener('click', resetGame);

  const surrender = document.getElementById('surrender');
  surrender.addEventListener('click', () => {
      if (gameOver) return;
      gameOver = true;
      if (playerMove === 'X') {
          O.innerText = `player O: ${parseInt(O.innerText.split(':')[1]) + 1}`;
          alert('Player O wins!');
      } else {
          X.innerText = `player X: ${parseInt(X.innerText.split(':')[1]) + 1}`;
          alert('Player X wins!');
      }
      resetGame();
  });
});
