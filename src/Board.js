// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //create a counter variable initialzied at 0
      let counter = 0;
      //loop thru board.rows() at speicifc index
      for (let i = 0; i < this.rows()[rowIndex].length; i++) {
        //if item is equal to 1
        if (this.rows()[rowIndex][i] === 1) {
          //increase counter by 1
          counter++;
        }
      }
      //return count > 1 ? true : false
      return (counter > 1 ? true : false);
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //loop through every row, every index in board.rows()
      for (let i = 0; i < this.rows().length; i++) {
        //for each row, run hasRowConflictAt(rowIndex)
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
      //return result from hasRowConflictAt(rowIndex)
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //initizlie counter var at 0
      let counter = 0;
      //loop thru all our arrays (this.rows())
      for (let i = 0; i < this.rows().length; i++) {
        //if specific item in the specific row (using two brakcet i's) equals 1
        if (this.rows()[i][colIndex] === 1) {
          //counter ++
          counter++;
        }
      }
      //ternary operator WITH parentheses and return if counter > 1
      return (counter > 1 ? true : false);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //loop thru all the arrays (this.rows())
      for (let i = 0; i < this.rows().length; i++) {
        ////if this.hasColConflictAt(at specific index) true
        if (this.hasColConflictAt(i)) {
          //return true
          return true;
        }
      //return false
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //create a counter variable, initialize at 0
      let counter = 0;
      //loop through this.rows()
      for (let i = 0; i < this.rows().length; i++) {
      //for each row, if row i and col user-input + i === 1
        if(this.rows()[i][majorDiagonalColumnIndexAtFirstRow + i] === 1) {
          //counter++
          counter++;
        }
      }
      //return counter > 1
      return counter > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      for (let i = 0; i < this.rows().length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
        if (this.hasMajorDiagonalConflictAt(i * -1)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //initilize counter variable at zero
      let counter = 0;
      //loop thru this.rows()
      for (let i = 0; i < this.rows().length; i++) {
        //if rows()[i][UI - i] === 1
        if (this.rows()[i][minorDiagonalColumnIndexAtFirstRow - i] === 1) {
          //counter++
          counter++;
        }
      }
      return counter > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //loop thru all this.rows()
      for (let i = 0; i < (this.rows().length * 2); i++) {
        //if this.hasMinorDiagonalat(i)
        if (this.hasMinorDiagonalConflictAt(i)) {
          //return true
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
