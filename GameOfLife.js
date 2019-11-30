class GameOfLife {

  constructor(board){
    if(!this.initialStateValid(board)){
      throw new Error('Make sure the supplied board is 2D, with consistent row lengths');
    }

    this.currentState = board;
    this.largestYCoordinate = board.length - 1;
    this.largestXCoordinate = board[0].length - 1;
    this.futureState;
    this.turns = 0;

    this.resetFutureState();

  }

  resetFutureState(){
    this.futureState = [];
    for(let i=0; i <= this.largestYCoordinate; i++){
      this.futureState[i] = [];
    }
  }

  takeTurn(){

    this.currentState.forEach( (row, y) => {
      row.forEach( (cell, x) => {
          //cycle through every poisition
          if(cell){
            //position is alive, decide what to mark in futureState
            this.futureState[y].push(this.shouldCellDie(x,y) ? 0 : 1);
          } else if(this.shouldCellBecomeAlive(x,y)) {
            //position is flanked by 3 alive neighbours; live!
            this.futureState[y].push(1);
          } else {
            //position is dead, mark that in futureState
            this.futureState[y].push(0);
          }
      })
    })

    this.currentState = this.futureState;
    this.turns += 1;
    this.resetFutureState()
  }

  shouldCellDie(x,y){

    let neighbours = this.numberOfLivingNeighbours(x,y);

    /*
    Return true, die, if fewer than two OR more than 3 neighbours.
    Otherwise, false; don't die.
    */
    return neighbours < 2 || neighbours > 3;
  }

  shouldCellBecomeAlive(x,y){
    let neighbours = this.numberOfLivingNeighbours(x,y);
    /*
    Return true, live if exactly 3 neighbours.
    Otherwise, false; don't live.
    */
    return neighbours === 3;
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
