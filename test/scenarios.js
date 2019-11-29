const {expect} = require('chai');
const Life = require('../GameOfLife').GameOfLife;


describe("Conway's Game of Life", function() {

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
