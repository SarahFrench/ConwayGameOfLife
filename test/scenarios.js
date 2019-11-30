const {expect} = require('chai');
const Life = require('../GameOfLife').GameOfLife;


describe("Scenario 0: No interactions", function() {
// Given a game of life When there are no live cells Then on the next step there are still no live cells

  it("after one turn, a empty board remains empty", function() {
    /*
    Given a game of life
    When there are no live cells
    */
    let board = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];
    let game = new Life(board);

    // Then on the next step there are still no live cells
    game.takeTurn();

    expect(game.searchForAnyLife()).to.be.false;
    expect(game.turns).to.equal(1);

  })
})

describe("Scenario 1: Underpopulation", function() {
// Given a game of life When a live cell has fewer than two neighbours Then this cell dies


  it("cells with no neighbours die", function() {
    /*
    Given a game of life
    When a live cell has fewer than two neighbours:
      Cell 1 (x=2 y=2) - No neighbours
      Cell 2 (x=4 y=4) - No neighbours
    */

    let board = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,1,0,0],
      [0,0,0,0,0],
      [0,0,0,0,1]
    ];
    let game = new Life(board);
    let cell1 = {x:2 , y:2}
    let cell2 = {x:4 , y:4}

    // Then the cell dies (after the next turn)
    game.takeTurn();

    expect(game.isCellAlive(cell1.x, cell1.y)).to.be.false;
    expect(game.isCellAlive(cell2.x, cell2.y)).to.be.false;

  })

  it("cells with only 1 neighbour die", function() {
    /*
    Given a game of life
    When a live cell has fewer than two neighbours:
      Cell 1 (x=2 y=2) - 1 neighbour (cell 2)
      Cell 2 (x=3 y=2) - 1 neighbour (cell 1)
      Cell 3 (x=3 y=4) - 1 neighbour (cell 4)
      Cell 4 (x=4 y=4) - 1 neighbour (cell 3)
    */

    let board = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,1,1,0],
      [0,0,0,0,0],
      [0,0,0,1,1]
    ];
    let game = new Life(board);
    let cell1 = {x: 2, y:2};
    let cell2 = {x: 3, y:2};
    let cell3 = {x: 3, y:4};
    let cell4 = {x: 4, y:4};

    game.takeTurn();

    // Then the cell dies
    expect(game.isCellAlive(cell1.x,cell1.y)).to.be.false;
    expect(game.isCellAlive(cell2.x,cell2.y)).to.be.false;
    expect(game.isCellAlive(cell3.x,cell3.y)).to.be.false;
    expect(game.isCellAlive(cell4.x,cell4.y)).to.be.false;

  })

})


describe("Scenario 2: Overcrowding", function() {
// Given a game of life When a live cell has more than three neighbours Then this cell dies


  it("cells with more than 3 neighbours die", function() {
    /*
    Given a game of life
    When a live cell has more than three neighbours
      Cell (x=2 y=2) - 4 neighbours => DIE
      Neighbour 1 (x=2 y=1)
      Neighbour 2 (x=1 y=2)
      Neighbour 3 (x=3 y=2)
      Neighbour 4 (x=2 y=3)
    */

    let board = [
      [0,0,0,0,0],
      [0,0,1,0,0],
      [0,1,1,1,0],
      [0,0,1,0,0],
      [0,0,0,0,0]
    ];
    let game = new Life(board);
    let cell = {x: 2, y:2};

    game.takeTurn();

    // Then that cell dies
    expect(game.isCellAlive(cell.x, cell.y)).to.be.false;

  })
})

describe("Scenario 3: Survival", function() {
  // Given a game of life When a live cell has two or three neighbours Then this cell stays alive

  it("cells with 2 or 3 neighbours survive", function() {
    /*
    Given a game of life
    When a live cell has two or three neighbours
      Cell 1 (x=1 y=1) - 2 neighbours => SURVIVE
      Cell 2 (x=3 y=3) - 3 neighbours => SURVIVE
    */

    let board = [
      [0,0,0,0,0],
      [1,1,1,0,0],
      [0,0,0,1,0],
      [0,0,1,1,1],
      [0,0,0,0,0]
    ];
    let game = new Life(board);
    let cell1 = {x: 1, y:1};
    let cell2 = {x: 3, y:3};

    game.takeTurn();

    // Then this cell stays alive
    expect(game.isCellAlive(cell1.x, cell1.y)).to.be.true;
    expect(game.isCellAlive(cell2.x, cell2.y)).to.be.true;
  })
})

describe("Scenario 4: Creation of Life", function() {
  /*
  Given a game of life
  When an empty position has exactly three neighbouring cells
  Then a cell is created in this position
  */

  it("empty cells with exactly 3 neighbours become alive", function() {
    /*
    Given a game of life
    When an empty position has exactly three neighbouring cells
      Position (x=1 y=1) - is currently dead, has 3 neighbours => BECOME ALIVE
      Cell 1 (x=0 y=0)
      Cell 2 (x=1 y=0)
      Cell 3 (x=0 y=1)
    */

    let board = [
      [1,1,0,0,0],
      [1,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];
    let game = new Life(board);
    let position = {x: 1, y:1};

    game.takeTurn();

    // Then this cell stays alive
    expect(game.isCellAlive(position.x, position.y)).to.be.true;
  })
})
