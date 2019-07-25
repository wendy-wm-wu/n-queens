/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  //create a new instance of a board to solution
  var solution = new Board({'n':n});
  //loop thru solutions.rows()
  for (let i = 0; i < solution.rows().length; i++) {
    //loop thru solutions.rows()[i]
    for (let j = 0; j < solution.rows()[i].length; j++) {
      //solutions.togglePiece(i, j);
      solution.togglePiece(i, j);
      //if solutions.hasAnyRowCons or solutions.hasAnyColCons
      if (solution.hasAnyRowConflicts() || solution.hasAnyColConflicts()) {
        //toggle piece back to zero
        solution.togglePiece(i, j);
      }
    }
  }
  //return solution.rows()
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let solutionCount = 0;
  //create instance of Board
  let board = new Board({'n':n});
  //define empty array for boardStorage
  let boardStorage = [board];
  //create helper function
  let helperFunctionRunCount = 0;
  let helper = () => {
    helperFunctionRunCount++;
    let tempBoardStorage = [];
    //loop thru every board in boardstorage
    for (let i = 0; i < boardStorage.length; i++) {
      //loop thru each row
      let lastPieceRow = 0;
      let lastPieceCol = 0;
      for (let j = boardStorage[i].rows().length - 1; j >= 0; j--) {
        for (let k = boardStorage[i].rows()[j].length - 1; k >= 0; k--) {
          if (boardStorage[i].get(j)[k] === 1) {
            lastPieceRow = j;
            lastPieceCol = k;
          }
        }
      }
      // if (n === 2 && boardStorage.length === 4) {
      //   debugger;
      // }
      for (let j = lastPieceRow; j < boardStorage[i].rows().length; j++) {
        //for each row, loop thru its indices
        for (let k = 0; k < boardStorage[i].rows()[j].length; k++) {
          if (boardStorage[i].get(j)[k] !== 1) {
            //togglePiece (place piece)
            boardStorage[i].togglePiece(j, k);
            //push board to boardStorage
            //make deep copy of array
            let arrayCopy = JSON.parse(JSON.stringify(boardStorage[i].rows()));
            //store new board made from deep copied array
            let newBoard = new Board(arrayCopy);
            //if rowCon & colCon of new board are false
            if (!newBoard.hasAnyRowConflicts() && !newBoard.hasAnyColConflicts()) {
              //push new board to tempstorage
              tempBoardStorage.push(new Board(arrayCopy));
            }
            //togglePiece (take off piece)
            boardStorage[i].togglePiece(j, k);
          }
        }
      }
    }
    boardStorage = tempBoardStorage;
    // while # of rooks less than n
    while (helperFunctionRunCount < n) {
      //and run helper recursively
      helper();
    }
  };
  //call helper outside
  helper();
  //solutionCount = boardStorage.length;
  if (n === 3) {
    debugger;
  }
  let uniqueSolutions = [];
  for (let i = 0; i < boardStorage.length; i++) {
    if (!uniqueSolutions.includes(JSON.stringify(boardStorage[i].rows()))) {
      uniqueSolutions.push(JSON.stringify(boardStorage[i].rows()));
    }
  }
  solutionCount = uniqueSolutions.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
