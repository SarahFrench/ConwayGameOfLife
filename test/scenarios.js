const {expect} = require('chai');
const Life = require('../GameOfLife').GameOfLife;


describe("Scenario 0 No interactions", function() {
// Given a game of life When there are no live cells Then on the next step there are still no live cells

  it("after one turn, a empty board remains empty", function() {
  // Given a game of life with an empty 5x5 board
    let board = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];
    let game = new Life(board);

  // When one turn elapses
    game.takeTurn();

  // Then I expect to see 1 turn has passed and there is no life
    expect(game.searchForAnyLife()).to.be.false;
    expect(game.turns).to.equal(1);

  })
})

describe("Scenario 1: Underpopulation", function() {
// Given a game of life When a live cell has fewer than two neighbours Then this cell dies


  it("a lone cell dies after a turn", function() {
    /*
    Given a game of life
    When a live cell has fewer than two neighbours:
      Cell 1 (x=2 y=2) - No neighbours
      Cell 2 (x=3 y=4) - 1 neighbour
      Cell 3 (x=4 y=4) - 1 neighbour
    */

    let board = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,1,0,0],
      [0,0,0,0,0],
      [0,0,0,1,1]
    ];
    let game = new Life(board);

    game.takeTurn();

    // Then the cell dies
    let cell1 = game.gameState[2][2];
    let cell2 = game.gameState[4][3];
    let cell3 = game.gameState[4][4];

    expect(cell1).to.equal(0);
    expect(cell2).to.equal(0);
    expect(cell3).to.equal(0);
    expect(game.searchForAnyLife()).to.be.false;

  })

})
