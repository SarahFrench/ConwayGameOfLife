### My initial thoughts

- make the game as a class
- initialiser is how you set state in the beginning
- the number of steps/turns could be a param passed into the initialiser, or the class could have a .step() function
- 2D grid will be an array of arrays, corresponding to rows and columns.
- Elements could be just booleans, 0 = dead and 1 = alive, or could be instances of another class?

TDD:

- Use the scenarios to write tests
- Using the exact Given/When/Tests in cucumber would be nice, but maybe a stretch goal


### 2019-11-29

Started making the class for the game, no rules implemented yet. Set up a test checking that an empty board is empty and remains empty after one turn.

### 2019-11-30

The GameOfLife class is initialised with a 'board' (array of arrays). This is assigned as the game's current state. Info about the board's dimensions are stored to help functions remain in bounds given different sized boards.

#### Functions implementing the game:
- **numberOfLivingNeighbours(x,y)**
  - this looks at positions 1 step away from a given cell at coordinate (x,y) and counts how many of those positions are currently alive.
  - Returns a number.


- **shouldCellDie**
  - uses the above function and implements the under- and overpopulation death rules by evaluating this conditional expression: `return neighbours < 2 || neighbours > 3;`


- **shouldCellBecomeAlive**
  - also uses the first function and returns true if exactly 3 neighbours are alive: `return neighbours === 3;`


- **takeTurn**
  - iterates through each cell in the `currentState` array of arrays
  - if cell is alive, test if it should die
    - Y: that position set = 0;
    - N: that position set = 1;
  - else, test if it should become alive
    - Y: that position set = 1;
    - N: that position set = 0;
  - else, keep that position dead
  >NOTE: when new state is being made it's assigned to the `futureState` property, which is also an array of arrays. This keeps evaluation of cells in `currentState` independent of how previous cells were evaluated. After iteration through current state is completed, `currentState` is set equal to `futureState`'s value, then `futureState` is reset.


- **resetFutureState**
  - sets `this.futureState` to an array of empty arrays. This uses the `this.largestYCoordinate` property to make sure enough 'row' arrays are present for values to be pushed into.

#### Functions for testing:

- **searchForAnyLife**
  - iterates through cells and returns a boolean if _any_ life is found


- **isCellAlive**
  - returns a boolean if the cell at that coordinate is alive.
  - made this function as it:
    - **A**: is more readable in tests
    - **B**: removed confusion about (x,y) vs currentState[y][x], and should avoid incorrect coordinates being used in tests


- **initialStateValid**
  - Checks that the class instance is being created with a valid board:
    - is present
    - has at least 2 rows
    - each row has the same length (i.e board is square)
  - this is used to throw an error in the initialiser if input is not valid
