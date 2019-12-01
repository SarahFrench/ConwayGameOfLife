const {expect} = require('chai');
const Life = require('../GameOfLife').GameOfLife;

describe("Fails gracefully when input is bad (searchForAnyLife function)", function(){

  const ERROR_MESSAGE = 'Make sure the supplied board is a 2D array, with consistent row lengths';

  it("an empty board is not valid", function() {
    //Given an empty board
    let board = [];

    //When it is the starting state for a game
    const makeGame = function(board){
      let game = new Life(board);
    }

    //Then I expect it to throw an Error that describes the problem
    expect(makeGame).to.throw(Error);
    expect(makeGame).to.throw(ERROR_MESSAGE);
  })

  it("a 1D board is not valid", function() {
    //Given an empty board
    let board = [0,0,0,0,0,0];

    //When it is the starting state for a game
    const makeGame = function(board){
      let game = new Life(board);
    }

    //Then I expect it to throw an Error that describes the problem
    expect(makeGame).to.throw(Error);
    expect(makeGame).to.throw(ERROR_MESSAGE);
  })

  it("a 2D board with inconsistent row lengths is not valid", function() {
    //Given a 2D board with inconsistent row lengths
    let board = [
      [0,0,0],
      [0,0,0],
      [0,0]
    ];

    //When it is the starting state for a game
    const makeGame = function(){
      let game = new Life(board);
    }

    //Then I expect it to throw an Error that describes the problem
    expect(makeGame).to.throw(Error);
    expect(makeGame).to.throw(ERROR_MESSAGE);
  })

  it("a 2D board with consistent row lengths is valid", function() {
    //Given a 2D board with consistent row lengths

    const board = [
      [0,0,0],
      [0,0,0]
    ];

    //When it is the starting state for a game
    const makeGame = function(){
      let game = new Life(board);
    }

    //Then I expect it to throw an Error that describes the problem
    expect(makeGame).to.not.throw(Error);
    expect(makeGame).to.not.throw(ERROR_MESSAGE);
  })

  it("rejects nonsense input", function() {
    //Given nonsence input
    const input1 = undefined;
    const input2 = "abcdefg";
    const input3 = 0;
    const input4 = {
      "key1": [0,0,0,0],
      "key2": ["value2"],
      "key3": "value3",
      "key4": 4,
    };


    //When it is the starting state for a game
    const makeGame1 = function(){
      let game = new Life(input1);
    }
    const makeGame2 = function(){
      let game = new Life(input2);
    }
    const makeGame3 = function(){
      let game = new Life(input3);
    }
    const makeGame4 = function(){
      let game = new Life(input3);
    }

    //Then I expect it to throw an Error that describes the problem
    expect(makeGame1).to.throw(Error);
    expect(makeGame1).to.throw(ERROR_MESSAGE);
    expect(makeGame2).to.throw(Error);
    expect(makeGame2).to.throw(ERROR_MESSAGE);
    expect(makeGame3).to.throw(Error);
    expect(makeGame3).to.throw(ERROR_MESSAGE);
    expect(makeGame4).to.throw(Error);
    expect(makeGame4).to.throw(ERROR_MESSAGE);
  })
});

describe("Detecting any life (searchForAnyLife function)", function(){

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

describe("Detecting life at a given position (isCellAlive function)", function(){

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

describe("Detecting neighbours (numberOfLivingNeighbours function)", function() {
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
      let cell = {x: 1, y:1};

      let neighbours = game.numberOfLivingNeighbours(cell.x,cell.y);

    // Then I expect to see no live neighbours counted
      expect(neighbours).to.be.equal(0);

  })

  it("identifies presence of neighbours in all positions relative to a cell in the board center", function() {
    /*
    Given a game of life with a 3x3 board
      and all live cells
    When the cell at the centre is alive (x=1 y=1)
      and all neighbours are alive
    */

    let board = [
      [1,1,1],
      [1,1,1],
      [1,1,1]
    ];
    let game = new Life(board);
    let cell = {x: 1, y:1};

    // When I check the number of live neighbours surrounding cell (1,1)
    let neighbours = game.numberOfLivingNeighbours(cell.x,cell.y);

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
    const cell1 = {x:1, y:0, neighbours:3 };
    const cell2 = {x:1, y:1, neighbours:5 };
    const cell3 = {x:2, y:2, neighbours:2 };
    const cells = [cell1, cell2, cell3];

    // Then I expect the number of live neighbours to be correct

    cells.forEach( cell => {
      let neighbours = game.numberOfLivingNeighbours(cell.x, cell.y);
      expect(neighbours).to.be.equal(cell.neighbours);
    })
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
    const cell = {x:0, y:0, neighbours:3 };

    // Then I expect the number of live neighbours to be correct, and no out of boundary errors
    let neighbours = game.numberOfLivingNeighbours(cell.x,cell.y);

    expect(neighbours).to.be.equal(cell.neighbours);

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
    const cell = {x:0, y:1, neighbours:5 };

    // Then I expect the number of live neighbours to be correct, and no out of boundary errors
    let neighbours = game.numberOfLivingNeighbours(cell.x,cell.y);
    expect(neighbours).to.be.equal(cell.neighbours);

  })
})

describe("Determining who should die (shouldCellDie function)", function() {
  it("a single cell will die", function() {
    /*
      Given a game of life with a 3x3 board
      When there's a single live cell at the center
    */
    let board = [
      [0,0,0],
      [0,1,0],
      [0,0,0]
    ];
    let game = new Life(board);
    const cell = {x:1, y:1};

    // Then I expect to that the cell is meant to die
    let death = game.shouldCellDie(cell.x,cell.y);
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
    const cell = {x:1, y:1};

    // Then I expect that cell to die
    let death = game.shouldCellDie(cell.x,cell.y);
    expect(death).to.be.true;

  })
})
