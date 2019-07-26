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
  let helper = board => {
    let numberOfRooks = 0;
    for (let i = 0; i < board.rows().length; i++) {
      if (board.rows()[i].includes(1)) {
        numberOfRooks++;
      }
    }
    if (numberOfRooks === n) {
      solutionCount++;
      return;
    }
    let lastPieceRow = 0;
    for (let i = board.rows().length - 1; i >= 0; i--) {
      if (board.rows()[i].includes(1)) {
        lastPieceRow = i + 1;
        break;
      }
    }
    for (let i = lastPieceRow; i < board.rows().length; i++) {
      for (let j = 0; j < board.rows()[i].length; j++) {
        if (board.rows()[i][j] !== 1) {
          board.togglePiece(i, j);
          if (board.hasAnyRooksConflicts()) {
            board.togglePiece(i, j);
          } else {
            let deepCopy = JSON.parse(JSON.stringify(board.rows()));
            board.togglePiece(i, j);
            helper(new Board(deepCopy));
          }
        }
      }
    }
  };
  helper(new Board({'n': n}));

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;

};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // //create a new instance of a board
  // var solution = new Board({n:n});
  // //create helper function
  // let helper = board => {
  //   let numberOfQueens = 0;
  //   for (let i = 0; i < board.rows().length; i++) {
  //     if (board.rows()[i].includes(1)) {
  //       numberOfQueens++;
  //     }
  //   }
  //   //base case, if 3 of queesn = n
  //   if (numberOfQueens === n) {
  //   //return (exit recurisve call)
  //     return;
  //   }
  //   //iterate through each row in board.rows()
  //   for (let i = 0; i < solution.rows().length; i++) {
  //     //iterate through each item in the row
  //     for (let j = 0; j < solution.rows()[i].length; j++) {
  //       if (solution.rows()[i][j] !== 1) {
  //         //toggle item in the row
  //         solution.togglePiece(i, j);
  //         //if there are queen conflicts
  //         //if (n === 4 && i === 3 && j === 2) {
  //           debugger;
  //         //}
  //         if ((numberOfQueens <  n) && i === solution.rows().length - 1 && j === solution.rows()[i].length - 1) {
  //           //return to exit recursion
  //           solution.togglePiece(i, j);
  //           return;
  //         //else
  //         }
  //         if (solution.hasAnyQueensConflicts()) {
  //           //untoggle item
  //           solution.togglePiece(i, j);
  //         //else if number of queens is less than n AND index is on last item
  //         } else {
  //           //recurse
  //           helper(solution);
  //         }
  //       }
  //     }
  //   }
  // }
  // //helper outside function of board
  // helper(solution);
  // //return board
  // return solution.rows();

  let solutionCount = 0;
  let solvedBoard = new Board({'n': n});
  let helper = board => {
    if (solutionCount > 0) {
      return;
    }
    let numberOfRooks = 0;
    for (let i = 0; i < board.rows().length; i++) {
      if (board.rows()[i].includes(1)) {
        numberOfRooks++;
      }
    }
    if (numberOfRooks === n) {
      solvedBoard = board;
      solutionCount++;
      return;
    }
    let lastPieceRow = 0;
    for (let i = board.rows().length - 1; i >= 0; i--) {
      if (board.rows()[i].includes(1)) {
        lastPieceRow = i + 1;
        break;
      }
    }
    for (let i = lastPieceRow; i < board.rows().length; i++) {
      for (let j = 0; j < board.rows()[i].length; j++) {
        if (board.rows()[i][j] !== 1) {
          board.togglePiece(i, j);
          if (board.hasAnyQueensConflicts()) {
            board.togglePiece(i, j);
          } else {
            let deepCopy = JSON.parse(JSON.stringify(board.rows()));
            board.togglePiece(i, j);
            helper(new Board(deepCopy));
          }
        }
      }
    }
  };
  helper(new Board({'n': n}));

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solvedBoard));
  return solvedBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let solutionCount = 0;
  let helper = board => {
    let numberOfRooks = 0;
    for (let i = 0; i < board.rows().length; i++) {
      if (board.rows()[i].includes(1)) {
        numberOfRooks++;
      }
    }
    if (numberOfRooks === n) {
      solutionCount++;
      return;
    }
    let lastPieceRow = 0;
    for (let i = board.rows().length - 1; i >= 0; i--) {
      if (board.rows()[i].includes(1)) {
        lastPieceRow = i + 1;
        break;
      }
    }
    for (let i = lastPieceRow; i < board.rows().length; i++) {
      for (let j = 0; j < board.rows()[i].length; j++) {
        if (board.rows()[i][j] !== 1) {
          board.togglePiece(i, j);
          if (board.hasAnyQueensConflicts()) {
            board.togglePiece(i, j);
          } else {
            let deepCopy = JSON.parse(JSON.stringify(board.rows()));
            board.togglePiece(i, j);
            helper(new Board(deepCopy));
          }
        }
      }
    }
  };
  helper(new Board({'n': n}));

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
