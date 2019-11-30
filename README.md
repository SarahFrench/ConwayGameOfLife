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
>| O | O | O |
>| X | X | X |
>| O | O | O |
>+---+---+---+
>```
>When the game evolves one turn
>
>Then the next state is...
>
>```
>+---+---+---+
>| O | X | O |
>| O | X | O |
>| O | X | O |
>+---+---+---+
>```
>When the game evolves another turn
>
>Then the next state is...
>```
>+---+---+---+
>| O | O | O |
>| X | X | X |
>| O | O | O |
>+---+---+---+
>```
