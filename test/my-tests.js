const {expect} = require('chai');
const Life = require('../GameOfLife').GameOfLife;

describe("Fails gracefully when input is bad (initialStateValid function)", function(){

  //reuse in test suite
  const ERROR_MESSAGE = 'Make sure the supplied board is a 2D array, with consistent row lengths';

  it("an empty board is not valid", function() {
    //Given an empty board
    let board = [];

    //When it is the starting state for a game
    const makeGame = function(){
      let game = new Life(board);
    }

    //Then I expect it to throw an Error that describes the problem
    expect(makeGame).to.throw(Error);
    expect(makeGame).to.throw(ERROR_MESSAGE);
  })

  it("a 1D board is not valid", function() {
    //Given a 1D board
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
    //Given non-array/nonsence input
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
    const scenarios = [makeGame1, makeGame2, makeGame3, makeGame4]

    //Then I expect the game to throw a descriptive error when constructed
    scenarios.forEach(scenario => {
      expect(scenario).to.throw(Error);
      expect(scenario).to.throw(ERROR_MESSAGE);
    })
  })
});

describe("Detecting any life (searchForAnyLife function)", function(){

  it("an empty board is found to be empty", function() {
    /*
      Given a game of life
      When there's no life
    */
    let board = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    let game = new Life(board);

    // Then I expect that no life can be found
    expect(game.searchForAnyLife()).to.be.false;

  })

  it("a board containing life is not found to be empty", function() {
    /*
      Given a game of life
      When there is a single live cell
    */
    let board = [
      [0,0,0],
      [0,1,0],
      [0,0,0]
    ];
    let game = new Life(board);

    // Then I expect that life can be found
    expect(game.searchForAnyLife()).to.be.true;

  })

})

describe("Detecting life at a given position (isCellAlive function)", function(){

  it("an alive cell is recognised as being alive", function() {
    /*
      Given a game of life
      When there is a live cell
   */
   let board = [
     [0,0,0],
     [0,1,0],
     [0,0,0]
   ];
   let game = new Life(board);
   let cell = {x: 1, y:1};

   // Then I expect to see life detected at that cells coordinates
    expect(game.isCellAlive(cell.x, cell.y)).to.be.true;

  })

  it("a dead cell is recognised as being dead", function() {
    /*
      Given a game of life
      When all cells are dead
   */
   let board = [
     [0,0,0],
     [0,0,0],
     [0,0,0]
   ];
   let game = new Life(board);
   let cell = {x: 1, y:1};

   // Then I expect to see no life detected at a given coordinate
    expect(game.isCellAlive(cell.x, cell.y)).to.be.false;

  })

})

describe("Detecting neighbours (numberOfLivingNeighbours function)", function() {

  it("identifies that there are no living neighbours for a cell on its own", function() {
    /*
      Given a game of life
      When there's a single live cell
    */
    let board = [
      [0,0,0],
      [0,1,0],
      [0,0,0]
    ];
    let game = new Life(board);
    let cell = {x: 1, y:1};

    // Then I expect to see no live neighbours counted
    let neighbourCount = game.numberOfLivingNeighbours(cell.x,cell.y);
    expect(neighbourCount).to.be.equal(0);

  })

  it("identifies presence of neighbours in all possible positions relative to a cell", function() {
    /*
      Given a game of life
      When a cell is surrounded by all live cells
        and the cell is not at the board's edge
    */
    let board = [
      [1,1,1],
      [1,1,1],
      [1,1,1]
    ];
    let game = new Life(board);
    let cell = {x: 1, y: 1};

    // Then I expect the number of live neighbours to be 8
    let neighbourCount = game.numberOfLivingNeighbours(cell.x,cell.y);
    expect(neighbourCount).to.be.equal(8);
  })

  it("can count neighbours at board edges without throwing errors", function() {
    /*
      Given a game of life
      When there are live cells on a boundary and in a corner
    */
    let board = [
      [1,0,0],
      [1,0,0],
      [0,0,0]
    ];
    let game = new Life(board);
    const cell1 = {x:0, y:0};
    const cell2 = {x:0, y:1};
    const cells = [cell1, cell2];

    /*
      Then I expect that counting the number of live neighbours does not cause any
      out of boundary errors to occur

      (JavaScript will return undefined if you try to access a position outside the board)
    */
    cells.forEach(cell => {
      expect(function(){
          let game = new Life(board);
          game.numberOfLivingNeighbours(cell.x,cell.y);
      }).to.not.throw(TypeError);

      expect(function(){
        let game = new Life(board);
        game.numberOfLivingNeighbours(cell.x,cell.y);
      }).to.not.throw('undefined');
    });

  })

  it("can count neighbours for a cell in a corner of the board", function() {
    /*
      Given a game of life
      When there's a live cell in the corner
        surrounded by live cells
    */
    let board = [
      [1,1,0],
      [1,1,0],
      [0,0,0]
    ];
    let game = new Life(board);
    const cell = {x:0, y:0, neighbours:3 };

    // Then I expect the number of live neighbours to be counted correctly
    let neighbourCount = game.numberOfLivingNeighbours(cell.x,cell.y);
    expect(neighbourCount).to.be.equal(cell.neighbours);

  })

  it("can count neighbours for a cell on the board's edge", function() {
    /*
      Given a game of life
      When there's a live cell in the middle of a game boundary
        surrounded by live cells
    */
    let board = [
      [1,1,0],
      [1,1,0],
      [1,1,0]
    ];
    let game = new Life(board);
    const cell = {x:0, y:1, neighbours:5 };

    /*
      Then I expect the number of live neighbours to be counted correctly,
        and no out of boundary errors to occur
    */
    let neighbourCount = game.numberOfLivingNeighbours(cell.x,cell.y);
    expect(neighbourCount).to.be.equal(cell.neighbours);

  })

  it("identifies the correct number of neighbours for different positions in a mixed board", function() {

    /*
    Given a game of life
    When there are a mixture of dead and alive cells, including:
        Cell 1 in position x=1, y=0 with 3 neighbours
        Cell 2 in position x=1, y=1 with 5 neighbours
        Cell 3 in position x=2, y=2 with 2 neighbours
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

    /*
      Then I expect the correct number of live neighbours to be counted for each
        position tested
    */
    cells.forEach(cell => {
      let neighbourCount = game.numberOfLivingNeighbours(cell.x, cell.y);
      expect(neighbourCount).to.be.equal(cell.neighbours);
    })
  })

})

describe("Determining who should die (shouldCellDie function)", function() {
  it("a single cell will die", function() {
    /*
      Given a game of life
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
      Given a game of life
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

describe("Knows the maximum coordinates on X and Y in the board", function() {

  it("determines max coordinates", function() {
    /*
     Given a game of life
     When the board is X columns wide and Y rows high
    */
    let board = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    let game = new Life(board);

    // Then I expect the game to know the largest coordinates in both X and Y directions
    expect(game.largestXCoordinate).to.be.equal(2);
    expect(game.largestYCoordinate).to.be.equal(2);

  })

})

describe("Keeps track of how many turns have passed", function() {
  it("counts how many turns take place", function() {

    // Given a game of life
    let board = [
      [0,0,0],
      [0,1,0],
      [0,0,0]
    ];
    let game = new Life(board);

    // When X number of turns takes place
    const x = 5;
    for(let i=0; i<x; i++){
      game.takeTurn();
    }

    // Then I expect the game knows X number of turns have elapsed
    expect(game.turns).to.be.equal(x);

  })

})
