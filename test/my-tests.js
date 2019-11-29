const {expect} = require('chai');
const Life = require('../GameOfLife').GameOfLife;

describe("Detecting neighbours", function() {
  it("identifies that there are no living neighbours for one cell", function() {
    // Given a game of life with a 3x3 board and one live cell at the center
      let board = [[0,0,0],[0,1,0],[0,0,0]];
      let game = new Life(board);

    // When I check for number of live neighbours
      let neighbours = game.numberOfLivingNeighbours();

    // Then I expect to see no live neighbours counted
      expect(neighbours).to.be.equal(0);

  })
})

describe("Determines who should die", function() {
  it("a single cell will die", function() {
    // Given a game of life with a 3x3 board and one live cell at the center
      let board = [[0,0,0],[0,1,0],[0,0,0]];
      let game = new Life(board);

    // When I check for number of live neighbours
      let death = game.shouldCellDie([1,1]);

    // Then I expect to see no live neighbours counted
      expect(death).to.be.true;

  })
})
