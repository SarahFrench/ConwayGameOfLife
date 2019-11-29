const {expect} = require('chai');
const Life = require('../GameOfLife').GameOfLife;


describe("Scenario 0 No interactions", function() {
// Given a game of life When there are no live cells Then on the next step there are still no live cells

  it("an empty board is empty", function() {
  // Given a game of life with an empty 5x5 board
    let board = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    let game = new Life(board);

  // When I search for any life
    let lifePresent = game.searchForAnyLife();

  // Then I expect to see nothing
    expect(lifePresent).to.be.false;

  })

  it("after one turn, a empty board remains empty", function() {
  // Given a game of life with an empty 5x5 board
    let board = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
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


  it("a lone cell dies after 1 turn", function() {
  // Given a game of life with one live cell
    let board = [[0,0,0,0,1],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    let game = new Life(board);

    // When one turn elapses
      game.takeTurn();

  // Then I expect the cell to have died (due to underpopulation)
    expect(game.searchForAnyLife()).to.be.false;

  })

})
