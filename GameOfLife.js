class GameOfLife {

  constructor(gameBoard){
    this.gameState = gameBoard;
    this.turns = 0
    if(gameBoard.length > 0 && gameBoard[0].length > 0){
      //board is 2d
      this.largestYCoordinate = gameBoard.length - 1;
      this.largestXCoordinate = gameBoard[0].length - 1;
    }

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

    let aliveNeighbours = 0;

    neighbourVectors.forEach( vector => {
      //positive side
      let neighbourX = x + vector[0];
      let neighbourY = y + vector[1];

      if(
        neighbourY >= 0 &&
        neighbourX >= 0 &&
        neighbourY <= this.largestYCoordinate &&
        neighbourX <= this.largestXCoordinate
      ){
        //coordinates are in bounds
        if (this.gameState[neighbourY][neighbourX]){
          aliveNeighbours += 1;
        }
      }

      //negative side
      neighbourX = x - vector[0];
      neighbourY = y - vector[1];

      if(
        neighbourY >= 0 &&
        neighbourX >= 0 &&
        neighbourY <= this.largestYCoordinate &&
        neighbourX <= this.largestXCoordinate
      ){
        //coordinates are in bounds
        if (this.gameState[neighbourY][neighbourX]){
          aliveNeighbours += 1;
        }
      }
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
