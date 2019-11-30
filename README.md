# Conway's Game Of Life

## Setting up the project

Clone this repository and run `npm install`.

##### Tests:
Mocha is used to run tests for different scenarios (see below). Either use the command `mocha` or `npm run test` to run them.

- `test/scenarios.js` has tests for the scenarios listed below
- `test/my-tests.js` has tests for the functions in the GameOfLife class, which I used during development

## Brief

- Infinite 2d grid made of cells
- Each cell can be living or dead - i.e. boolean state
- Cells interact with their neighbours: horizontally, vertically, and diagonally

  ### Assumptions made:
  The grid used in my solution isn't infinite as the brief describes, but my code can take in starting states of different sizes.

  The grid doesn't wrap around (yet?), but you could perhaps add this using a modulo to calculate coordinates when checking on alive neighbours. This would probably allow the simulation able to sustain itself much longer, as the boundaries reduce the number of possible neighbours.

  Also, there's the assumption the starting state will have minimum dimensions of 2x2. If something else is entered the class is designed to throw an error.

## Scenarios

Use these for test driven development

#### Scenario 0 No interactions


>Given a game of life
>
> When there are no live cells
>
>Then on the next step there are still no live cells


#### Scenario 1: Underpopulation
>Given a game of life
>
>When a live cell has fewer than two neighbours
>
>Then this cell dies

#### Scenario 2: Overcrowding
>Given a game of life
>
>When a live cell has more than three neighbours
>
>Then this cell dies

#### Scenario 3: Survival

>Given a game of life
>
>When a live cell has two or three neighbours
>
>Then this cell stays alive

#### Scenario 4: Creation of Life
>Given a game of life
>
>When an empty position has exactly three neighbouring cells
>
>Then a cell is created in this position

### When applied these scenarios result in the following:

#### Scenario 5: Grid with no live cells

>Given a game of life with the initial state containing no live cells
>
>When the game evolves one turn
>
>Then the next state also contains no live cells

#### Scenario 6: Expected game outcome for seeded grid

>Given a game of life with the initial state...
>
>```
>+---+---+---+
| O | O | O |
| X | X | X |
| O | O | O |
+---+---+---+
```
>When the game evolves one turn
>
>Then the next state is...
>
>```
>+---+---+---+
| O | X | O |
| O | X | O |
| O | X | O |
+---+---+---+
```
>When the game evolves another turn
>
>Then the next state is...
>```
>+---+---+---+
| O | O | O |
| X | X | X |
| O | O | O |
+---+---+---+
```
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
