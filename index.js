const Life = require('./GameOfLife').GameOfLife;

//Basic 3x3 board to get started
let board = [
  [0,0,0],
  [1,1,1],
  [0,0,0]
];
let game = new Life(board);

//Scenario 6 from tests prints to console
console.log(`Turn: ${game.turns}`);
game.printBoard();
game.takeTurn();

console.log(`Turn: ${game.turns}`);
game.printBoard();
game.takeTurn();

console.log(`Turn: ${game.turns}`);
game.printBoard();
