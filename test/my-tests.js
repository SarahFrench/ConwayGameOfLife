const {expect} = require('chai');
const Life = require('../GameOfLife').GameOfLife;

describe("Detecting any life", function(){

  it("an empty board is found to be empty", function() {
  // Given a game of life with an empty 5x5 board
    let board = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];
    let game = new Life(board);

  // When I search for any life
    let lifePresent = game.searchForAnyLife();

  // Then I expect to see nothing
    expect(lifePresent).to.be.false;

  })

  it("an board containing life is not found to be empty", function() {
  // Given a game of life that contains a live cell
    let board = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,1,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];
    let game = new Life(board);

  // When I search for any life
    let lifePresent = game.searchForAnyLife();

  // Then I expect to see nothing
    expect(lifePresent).to.be.true;

  })

})

describe("Detecting life at a given position", function(){

  it("an alive cell is recognised as being alive", function() {
  // Given a game of life with a live cell
    let board = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,1,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];
    let game = new Life(board);
    let cell = {x: 2, y:2};

  // When I search for any life
    let live = game.isCellAlive(cell.x, cell.y);

  // Then I expect to see it's reported as alive
    expect(live).to.be.true;

  })

  it("a dead cell is recognised as being dead", function() {
  // Given a game of life with a live cell
    let board = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];
    let game = new Life(board);
    let cell = {x: 2, y:2};

  // When I search for any life
    let live = game.isCellAlive(cell.x, cell.y);

  // Then I expect to see it's reported as alive
    expect(live).to.be.false;

  })

})

describe("Detecting neighbours", function() {
  it("identifies that there are no living neighbours for a cell on its own", function() {
    /*
    Given a game of life with a 3x3 board
    When there's one live cell at the center
      and I check for number of live neighbours next to that cell
    */

      let board = [
        [0,0,0],
        [0,1,0],
        [0,0,0]
      ];
      let game = new Life(board);

      let neighbours = game.numberOfLivingNeighbours(1,1);

    // Then I expect to see no live neighbours counted
      expect(neighbours).to.be.equal(0);

  })

  it("identifies presence of neighbours in all positions relative to a cell in the board center", function() {
    /*
    Given a game of life with a 3x3 board
      and all live cells
    When all the cells are alive
      and I check for number of live neighbours next to the cell at x=1 y=1
    */

    let board = [
      [1,1,1],
      [1,1,1],
      [1,1,1]
    ];
    let game = new Life(board);

    // When I check the number of live neighbours surrounding cell (1,1)
    let neighbours = game.numberOfLivingNeighbours(1,1);

    // Then I expect the number of live neighbours to be 8
    expect(neighbours).to.be.equal(8);
  })

  it("identifies the correct number of neighbours for different positions in a mixed board", function() {

    /*
    Given a game of life with a 3x3 board
        and a mixture of dead and alive cells
        Cell 1 in position x=1, y=0 aka [0][1]
        Cell 2 in position x=1, y=1 aka [1][1]
        Cell 3 in position x=2, y=2 aka [2][1]
    When I count the number of alive neighbours for each
    */
    let board = [
      [0,1,1],
      [1,1,0],
      [0,1,1]
    ];
    let game = new Life(board);

    let cell1Neighbours = game.numberOfLivingNeighbours(1,0);
    let cell2Neighbours = game.numberOfLivingNeighbours(1,1);
    let cell3Neighbours = game.numberOfLivingNeighbours(2,2);

    // Then I expect the number of live neighbours to be correct
    expect(cell1Neighbours).to.be.equal(3);
    expect(cell2Neighbours).to.be.equal(5);
    expect(cell3Neighbours).to.be.equal(2);

  })

  it("can count neighbours for a cell in a corner of the board", function() {
    /*
    Given a game of life with a 3x3 board
        and a cluster of living cells in a corner
    When I count the number of alive neighbours for the corner cell x=0 y=0
    */

    let board = [
      [1,1,0],
      [1,1,0],
      [0,0,0]
    ];
    let game = new Life(board);
    let neighbours = game.numberOfLivingNeighbours(0,0);

    // Then I expect the number of live neighbours to be correct, and no out of boundary errors
    expect(neighbours).to.be.equal(3);

  })

  it("can count neighbours for a cell on the board's edge", function() {
    /*
    Given a game of life with a 3x3 board
        and a cluster of living cells against the left boundary
    When I count the number of alive neighbours for the cell at the boundary midpoint
    */

    let board = [
      [1,1,0],
      [1,1,0],
      [1,1,0]
    ];
    let game = new Life(board);
    let neighbours = game.numberOfLivingNeighbours(0,1);

    // Then I expect the number of live neighbours to be correct, and no out of boundary errors
    expect(neighbours).to.be.equal(5);

  })
})

describe("Determining who should die", function() {
  it("a single cell will die", function() {
    // Given a game of life with a 3x3 board and one live cell at the center
    let board = [
      [0,0,0],
      [0,1,0],
      [0,0,0]
    ];
    let game = new Life(board);

    // When I check for number of live neighbours
    let death = game.shouldCellDie([1,1]);

    // Then I expect to see no live neighbours counted
    expect(death).to.be.true;

  })

  it("a cell with 4 neighbours will die", function() {
    /*
    Given a game of life with a 3x3 board
    When one live cell has 4 live neighbours
    */
    let board = [
      [0,1,0],
      [1,1,1],
      [0,1,0]
    ];
    let game = new Life(board);

    // Then I expect that cell to die

    let death = game.shouldCellDie([1,1]);
    expect(death).to.be.true;

  })
})
