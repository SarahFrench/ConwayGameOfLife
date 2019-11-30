const {expect} = require('chai');
const Life = require('../GameOfLife').GameOfLife;


describe("Scenario 0: No interactions", function() {
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

    game.takeTurn();

    // Then the cell dies
    let cell1 = game.currentState[2][2];
    let cell2 = game.currentState[4][4];

    expect(cell1).to.equal(0);
    expect(cell2).to.equal(0);
    expect(game.searchForAnyLife()).to.be.false;

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

    game.takeTurn();

    // Then the cell dies
    let cell1 = game.currentState[2][2];
    let cell2 = game.currentState[2][3];
    let cell3 = game.currentState[4][3];
    let cell4 = game.currentState[4][4];

    expect(cell1).to.equal(0);
    expect(cell2).to.equal(0);
    expect(cell3).to.equal(0);
    expect(cell4).to.equal(0);

  })

  it("cells with 2 neighbours don't die", function() {
    /*
    Given a game of life
    When a live cell has two neighbours:
      Cell 1 (x=2 y=1) - 2 neighbours
      Cell 2 (x=2 y=2) - 2 neighbours
      Cell 3 (x=3 y=2) - 2 neighbours
    */

    let board = [
      [0,0,0,0,0],
      [0,0,1,0,0],
      [0,0,1,1,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];
    let game = new Life(board);

    let cell1Before = game.currentState[1][2];
    let cell2Before = game.currentState[2][2];
    let cell3Before = game.currentState[2][3];

    game.takeTurn();

    // Then the cell survives
    let cell1After = game.currentState[1][2];
    let cell2After = game.currentState[2][2];
    let cell3After = game.currentState[2][3];

    //All were alive before
    expect(cell1Before).to.equal(1);
    expect(cell2Before).to.equal(1);
    expect(cell3Before).to.equal(1);
    //All are alive after
    expect(cell1After).to.equal(1);
    expect(cell2After).to.equal(1);
    expect(cell3After).to.equal(1);


  })

})


describe("Scenario 2: Overcrowding", function() {
// Given a game of life When a live cell has more than three neighbours Then this cell dies


  it("cells with more than 3 neighbours die", function() {
    /*
    Given a game of life
    When a live cell has more than three neighbours
      Cell (x=2 y=2) - 4 neighbours => DIE
      Neighbour 1 (x=2 y=1) - 3 neighbours => SURVIVE
      Neighbour 2 (x=1 y=2) - 3 neighbours => SURVIVE
      Neighbour 3 (x=3 y=2) - 3 neighbours => SURVIVE
      Neighbour 4 (x=2 y=3) - 3 neighbours => SURVIVE
    */

    let board = [
      [0,0,0,0,0],
      [0,0,1,0,0],
      [0,1,1,1,0],
      [0,0,1,0,0],
      [0,0,0,0,0]
    ];
    let game = new Life(board);

    game.takeTurn();

    // Then that cell dies
    let cell = game.currentState[2][2];
    expect(cell).to.equal(0);

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

    game.takeTurn();

    // Then this cell stays alive
    let cell1 = game.currentState[1][1];
    let cell2 = game.currentState[3][3];
    expect(cell1).to.equal(1);
    expect(cell2).to.equal(1);

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

    game.takeTurn();

    // Then this cell stays alive
    let position = game.currentState[1][1];
    expect(position).to.equal(1);
  })
})
