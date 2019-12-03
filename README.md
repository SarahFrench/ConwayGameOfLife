# Conway's Game Of Life

## Brief & Details

#### Task:

Implement Conway's Game of Life using TDD, to satisfy tests based on the scenarios listed below.

#### Links:
  - [My notes during this project](https://github.com/SarahFrench/ConwayGameOfLife/blob/master/NOTES-ON-PROGRESS.md)
  - **[Code from this repo made into a small Vue app that visualises the game](https://github.com/SarahFrench/vue-game-of-life)**
    - I've recently started learning Vue and thought this would be fun!
    - The code will need refactoring once I know more about Vue
  - **[Deployment of the above Vue app](https://sarahfrench.github.io/vue-game-of-life/)**

#### Assumptions made:

It's assumed that a new instance of the GameOfLife class is made by passing in an array of arrays, containing 1's or 0's to indicate life and death:

```
let board = [
  [0,0,0],
  [1,1,1],
  [0,0,0]
]
let game = GameOfLife.new(board);
```

 There are some checks to make sure the input is sensible, but it's assumed the values inside either 0 or 1.

**Not infinite** : My solution isn't infinite as the brief describes, but can take in starting states of different sizes.

**The edges of the board are solid boundaries:** The grid doesn't wrap around (similar to a game of Snake, or Pac-Man). This could probably be added by using a modulo to calculate coordinates of neighbours on the other side of the board.
>This change would allow the simulation to sustain itself much longer, as the boundaries reduce the number of possible neighbours and inhibit life.


## Cloning this project

Clone this repository and run `npm install`.

#### Tests:

Mocha is used to run tests for different scenarios (see below).
Use the command `npm run test` to run all the tests.

- `npm run scenario` : runs just integration tests from the brief (test/scenarios.js)
- `npm run unit` : runs just unit tests for the GameOfLife class (test/unit-tests.js)

The above should work for using the local mocha files, but if there are issues with mocha install it globally using `npm i --global mocha` and then run `mocha` in the project's root.


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
