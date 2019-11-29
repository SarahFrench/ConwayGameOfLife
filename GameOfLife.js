class GameOfLife {

  constructor(gameBoard){
    this.gameState = gameBoard;
    this.turns = 0
  }

  takeTurn(){
    //TODO: code invoking functions that implement the living/dying cells rules
    this.turns += 1;
  }

  shouldCellDie(x,y){

    let neighbours = this.numberOfLivingNeighbours(x,y);

    //yes, die if fewer than two or more than 3 neighbours
    return neighbours < 2 || neighbours > 3;
  }

  numberOfLivingNeighbours(x,y){
    let neighbourVectors = [
      [1,1],
      [1,0],
      [0,1],
      [-1,1]
    ];

    let aliveNeighbours;

    neighbourVectors.forEach( vector => {

      //TODO cycle through positions checking for life
    })

    return aliveNeighbours;
  }

  printBoard(){
    console.log(this.gameState)
  }

  printTurns(){
    console.log(this.turns);
  }

  searchForAnyLife(){
    let lifeFound = false;
    this.gameState.forEach( row => {
      row.forEach( cell => {
          lifeFound = cell ? true : lifeFound;
      })
    })
    return lifeFound;
  }
}

module.exports = {
  GameOfLife
}
