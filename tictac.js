/**
* @author Steven Leone
* @The Javascript for Tic Tac Toe Game
* @Version 1
*/


var boardPositions = [[],[],[]];
var winTallies = new Array(8).fill(0);
var movesCounter = 0;
var gameOver = false;
var currentPlayer = "X";
var xWins = 0;
var oWins = 0;

function cPlayer(){
  alert("It is " + currentPlayer + "'s turn");
}



function switchP() {
  var xElement = document.getElementById('xScore');
  var oElement = document.getElementById('oScore');
  var buttonChanges = document.getElementsByTagName('button');
  if (currentPlayer === "X") {
    currentPlayer = "O";
    oElement.className = 'oMyTurn';
    xElement.className = 'xOpponentTurn';
    for (var i in buttonChanges) {
      if (!(buttonChanges[i].className === "restart")) {
        buttonChanges[i].className = 'oTurn';
      }
    }
  } else {
    currentPlayer = "X";
    xElement.className = 'xMyTurn';
    oElement.className = 'oOpponentTurn';
    for (var i in buttonChanges) {
      if (!(buttonChanges[i].className === "restart")) {
        buttonChanges[i].className = 'xTurn';
      }
    }
  }
}

function playerO() {
	return currentPlayer === "O";
}

function checkW() {
  var i;
  for (i = 0; i < 8; i++) { 
    if (winTallies[i] === 3) {
     // alert("X wins!");
      gameOver = true;
      xWins += 1;
      document.getElementById("xScore").innerText = "X: " + xWins;
      document.getElementById("winLabel").innerText = "X Wins!";
      break;
    } else if (winTallies[i] === -3) {
      //alert("O wins!");
      gameOver = true;
      oWins += 1;
      document.getElementById("oScore").innerText = "O: " + oWins;
      document.getElementById("winLabel").innerText = "O Wins!";
      break;
    }
  }
  if (gameOver) {
    document.getElementById("deadFire").className = "fireworks";
  }
  if (movesCounter === 9 && !gameOver) {
    //alert("It's a draw!")
    document.getElementById("winLabel").innerText = "It's a draw!";
    gameOver = true;
  }
}

function changeVal(coords) {
  if (!gameOver) {
    var row = parseInt(coords.charAt(0));
    var column = parseInt(coords.charAt(1));
    var currentText = boardPositions[row][column];
    if (currentText == undefined || currentText == " ") {
      boardPositions[row][column] = currentPlayer;
      document.getElementById(coords).innerText = currentPlayer;
      movesCounter += 1;
      if (currentPlayer === "X") {
        winTallies[row] += 1;
        winTallies[column + 3] += 1;
        if (row + column === 2) {
          winTallies[6] += 1;
        }
        if ((row + column) % 2 === 0 && ((row + column != 2) || (column === 1))) {
          winTallies[7] += 1;
        }
      } else {
        winTallies[row] -= 1;
        winTallies[column + 3] -= 1;
        if (row + column === 2) {
          winTallies[6] -= 1;
        }
        if ((row + column) % 2 === 0 && ((row + column != 2) || (column === 1))) {
          winTallies[7] -= 1;
        }
      }
      checkW();
      switchP();
    } else {
      alert("There's already an " + currentText +" in that spot!");
    }
  }
}


function restartGame() {
  document.getElementById("winLabel").innerText = "Who will win?";
  document.getElementById("deadFire").className = "deadFire";
  movesCounter = 0;
  boardPositions = [[],[],[]];
  winTallies.fill(0);
  gameOver = false;
  var i;
  var j;
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      let coords = i.toString() + j.toString();
      document.getElementById(coords).innerText = " ";
    }
  }
}


