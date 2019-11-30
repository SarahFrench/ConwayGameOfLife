class GameOfLife {

  constructor(board){
    if(!this.initialStateValid(board)){
      throw new Error('Make sure the supplied board is 2D, with consistent row lengths');
    }

    this.currentState = board;
    this.largestYCoordinate = board.length - 1;
    this.largestXCoordinate = board[0].length - 1;
    this.turns = 0;


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
        if (this.currentState[neighbourY][neighbourX]){
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
        if (this.currentState[neighbourY][neighbourX]){
          aliveNeighbours += 1;
        }
      }
    })

    return aliveNeighbours;
  }

  printBoard(){
    console.log(this.currentState)
  }

  initialStateValid(board){
    if( !board || board.length < 2){
      //board absent or has less than 2 rows
      return false;
    } else {

      let rowsConsistentLength = true;

      board.forEach( row => {
        rowsConsistentLength = (row.length != board[0].length) ? false : rowsConsistentLength;
      })

      return rowsConsistentLength;
    }
  }

  searchForAnyLife(){
    let lifeFound = false;
    this.currentState.forEach( row => {
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
