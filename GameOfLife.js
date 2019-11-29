class GameOfLife {

  constructor(gameBoard){
    this.gameState = gameBoard;
    this.turns = 0
  }

  takeTurn(){
    //TODO: code invoking functions that implement the living/dying cells rules
    this.turns += 1;
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
