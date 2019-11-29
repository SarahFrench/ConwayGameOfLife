# Conway's Game Of Life

## Setting up the project

Clone this repository and run `npm install`.
Mocha is used to run tests for different scenarios (see below). Either use the command `mocha` or `npm run test` to run them.

## Brief

- infinite 2d grid made of cells
- each cell can be living or dead - i.e. boolean state
- cells interact with their neighbours: horizontally, vertically, and diagonally

## Scenarios

Use these for test driven development

### Scenario 0 No interactions

Given a game of life
When there are no live cells
Then on the next step there are still no live cells

### Scenario 1: Underpopulation
Given a game of life
When a live cell has fewer than two neighbours
Then this cell dies

### Scenario 2: Overcrowding
Given a game of life
When a live cell has more than three neighbours
Then this cell dies

### Scenario 3: Survival

Given a game of life
When a live cell has two or three neighbours
Then this cell stays alive

### Scenario 4: Creation of Life
Given a game of life
When an empty position has exactly three neighbouring cells
Then a cell is created in this position

### When applied these scenarios result in the following:

### Scenario 5: Grid with no live cells

Given a game of life with the initial state containing no live cells
When the game evolves one turn
Then the next state also contains no live cells


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

Started making the class for the game, no rules implemented yet. Set up a test checking that an empty board is empty and remains empty after one turn. I expect this test will break in future as I work on implementing the life/death rules.
