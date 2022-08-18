const express = require('express');
const pieceGenerator = require('C:\\Users\\vdako\\WebstormProjects\\memorygame\\javascripts\\server\\pieces.js');

class Board {
    /*
        initializes the board maintained for the current player with 27 rows due to last row being for checking

        board: 2D array that represents the board currently
        pieceHasFallen: boolean that indicates whether a new piece should be requested
     */
    constructor() {
        this.board = initializeBoard(10, 27);
        this.pieceHasFallen = true;
    }

    /*
        function that scans the entire board to check whether a piece is colliding with another
        a 2 touching a 1 defines a collision, which is also why the first row is made of 1s

        return: -1 and the index are the values returned to enable the retrieval of the index for more efficiency
     */
    checkForCollision() {
        for (let i = this.board.length - 1; i > 0; i--) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] == 1 && this.board[i - 1][j] >= 2) {
                    return i;
                }
            }
        }
        return -1;
    }

    /*
        Function that checks whether the piece currently on the board can move to the right
        If current pieces is touching a 1 value on the right or a wall- it can not move right

        return: boolean value that is used in the moveRight() function to know whether to allow the movement
     */
    checkCanMoveRight() {

        for (let i = this.board.length - 1; i > 0; i--) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (j == this.board[i].length - 1 && this.board[i][j] >= 2 || this.board[i][j] >= 2 && this.board[i][j + 1] == 1) {
                    return false;
                }
            }
        }

        return true;
    }

    /*
        Function that checks whether the piece currently on the board can move to the left
        If current pieces is touching a 1 value on the left or a wall- it can not move to the left

        return: boolean value that is used in the moveLeft() function to know whether to allow the movement
     */
    checkCanMoveLeft() {

        for (let i = this.board.length - 1; i > 0; i--) {
            for (let j = 1; j < this.board[i].length; j++) {
                if (this.board[i][j] >= 2 && this.board[i][j - 1] == 1) {
                    return false;
                }
            }

            if (this.board[i][0] >= 2) {
                return false;
            }
        }

        return true;
    }

    /*
       Adds a new piece in a random spot in the two top rows of the board, which will be hidden from the player in the final product

       piece: small 2D array generated in another module that returns a small 2D array appended to the top of the board
     */
    appendNewPieceToBoard(piece) {
        for (let i = 0; i < piece.length; i++) {
            for (let j = 0; j < piece[i].length; j++) {
                this.board[i][j] = piece[i][j];
            }
        }
    }

    /*
        Checks
     */
    checkForCompleteRow() {
        let arr = [];
        let completeRow = true;


        for (let i = 0; i < this.board.length - 1; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] != 1) {
                    completeRow = false;
                }
            }
            if (completeRow) {
                arr.push(i);
            }
            completeRow = true;
        }

        let b = this.board;

        arr.forEach(function (i) {
            for(let j=i; j>1; j--){
                for (let k = 0; k < b[i].length; k++) {
                    b[j][k] = b[j - 1][k];
                }
            }


        });
    };

    /*
        The function that chooses between the next board states. If a piece has collided, it asks for a new one
        If not, one more gravity tick occurs and process is repeated whenever necessary

        return: the new state of the board, which is sent to the client in the gameRouter upon their request
     */
    nextBoardState() {
        this.checkForCompleteRow();
        if (this.pieceHasFallen) {
            this.appendNewPieceToBoard(pieceGenerator());
            this.pieceHasFallen = false;
        }
        this.oneGravityTick();
        return this.board;
    }

    /*
        One gravity tick is called, which may result in a collision, and it may not
        In the case of a collision it targets the place on the board with the collision and converts all 2s to 1s
        In the case of no collision it displaces all 2s one block down

        The method simply modifies the current board and returns nothing
     */
    oneGravityTick() {
        let k = this.checkForCollision();

        if (k != -1) {
            this.convertTo1s(k);
            this.pieceHasFallen = true;

        } else {
            for (let i = this.board.length - 1; i > 0; i--) {
                for (let j = 0; j < this.board[i].length; j++) {
                    if (this.board[i][j] == 0 && this.board[i - 1][j] >= 2) {
                        this.board[i][j] = this.board[i - 1][j];
                        this.board[i - 1][j] = 0;
                    }
                }
            }
        }


    }

    /*
        Converts all 2s to 1s at the index specified with a couple of extra rows added to adjust for pieces that may collide in different places
     */
    convertTo1s(rowIndex) {

        if (rowIndex < 3) {
            for (let i = rowIndex; i >= 0; i--) {
                for (let j = 0; j < this.board[i].length; j++) {
                    if (this.board[i][j] >= 2) {
                        this.board[i][j] = 1;
                    }
                }
            }
        } else {
            let limit = rowIndex + 2;
            if (rowIndex >= 25) {
                limit = rowIndex;
            }
            for (let i = limit; i > rowIndex - 4; i--) {
                for (let j = 0; j < this.board[i].length; j++) {
                    if (this.board[i][j] >= 2) {
                        this.board[i][j] = 1;
                    }
                }
            }
        }


    }

    moveLeft() {
        if (this.checkCanMoveLeft()) {
            for (let i = this.board.length - 1; i > 0; i--) {
                for (let j = 0; j < this.board[i].length; j++) {
                    if (this.board[i][j] >= 2) {
                        this.board[i][j - 1] = this.board[i][j];
                        this.board[i][j] = 0;

                    }
                }
            }
        }

    }

    moveRight() {
        if (this.checkCanMoveRight()) {
            for (let i = this.board.length - 1; i > 0; i--) {
                for (let j = this.board[i].length - 1; j >= 0; j--) {
                    if (this.board[i][j] >= 2) {
                        this.board[i][j + 1] = this.board[i][j];
                        this.board[i][j] = 0;

                    }
                }
            }
        }
    }

    rotate() {

        let indexX = -1;
        let indexY = -1;

        for (let i = this.board.length - 1; i > 0; i--) {
            for (let j = this.board[i].length - 1; j >= 0; j--) {
                if (this.board[i][j] == 3) {
                    indexY = i;
                    indexX = j;
                    break;
                }
            }

            if (indexX != -1) {
                break;
            }
        }

        let rotX=[];
        let rotY=[];


        for (let i = indexY - 3; i < indexY + 4; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] == 2) {
                    // let x2 = i + indexX - indexY;
                    // let y2 = j + indexY - indexX;

                    let x2 = indexX + indexY-i;
                    let y2 = indexY- indexX + j;

                    rotX.push(x2);
                    rotY.push(y2);

                    this.board[i][j] = 0;

                }
            }

        }

        let n=rotX.length;
        for(let i=n; i>0;i--){
            this.board[rotY.pop()][rotX.pop()]=2;
        }


    }

    down() {
       this.oneGravityTick();
    }

    space(){
        while(!this.pieceHasFallen){
            this.oneGravityTick();
        }
    }

    checkFallenPiece(){
        return this.pieceHasFallen;
    }
}
/*
    Function that sends a new board object for each player that is used to maintain a session

    return: new Board object put in a map on the game router
 */
function sendNewBoard() {
    return new Board();
}

/*
    Function that initializes the board for each player in the constructor

    return: new 2D array of 0s and 1s on the last row to create a wall for easier implementation
 */
function initializeBoard(columns, rows) {
    let arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
        arr[i] = new Array(columns);
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
            if (i == rows - 1) {
                arr[i][j] = 1;
            }
        }
    }
    return arr;
};


module.exports = sendNewBoard;


