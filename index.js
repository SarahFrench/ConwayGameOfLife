const Life = require('./GameOfLife').GameOfLife;

//Basic 5x5 board to get started
let board = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
let game = new Life(board);

console.log(`This is the game after ${game.turns} turns`)
game.printBoard();
