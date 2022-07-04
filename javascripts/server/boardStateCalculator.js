const express= require('express');
const pieceGenerator= require('C:\\Users\\vdako\\WebstormProjects\\memorygame\\javascripts\\server\\pieces.js');

class Board {

    constructor(){
        this.board=initializeBoard(10,27); //initializes the board maintained for the current player with 27 rows due to last row being for checking
        this.pieceHasFallen=true;
    }


    checkForCollision(){

        for( let i=this.board.length-1; i> 0; i--) {
            for (let j = 0; j < this.board[i].length; j++) {

                if(this.board[i][j]==1 && this.board[i-1][j]==2){
                    return i;
                }
            }
        }
        return -1;

    }

    appendNewPieceToBoard(piece){
        for(let i=0; i<piece.length; i++){
            for(let j=0;j<piece[i].length;j++){
                this.board[i][j]=piece[i][j];
            }
        }
    }

    nextBoardState(){
        if(this.pieceHasFallen){
            this.appendNewPieceToBoard(pieceGenerator());
            this.pieceHasFallen=false;
        }
        this.oneGravityTick();
        return this.board;
    }

    oneGravityTick(){
        let k= this.checkForCollision();

        if(k!=-1){
            this.convert2sTo1s(k);
            this.pieceHasFallen=true;

        }else{
            for( let i=this.board.length-1; i> 0; i--) {
                for (let j = 0; j < this.board[i].length; j++) {
                    if(this.board[i][j]==0 && this.board[i-1][j]==2){
                        this.board[i][j]=2;
                        this.board[i-1][j]=0;
                    }
                }
            }
        }




    }

    convert2sTo1s(rowIndex) {

        if (rowIndex < 3) {
            for (let i = rowIndex; i >= 0; i--) {
                for (let j = 0; j < this.board[i].length; j++) {
                    if (this.board[i][j] == 2) {
                        this.board[i][j] = 1;
                    }
                }
            }
        } else {
            let limit=rowIndex+2;
            if(rowIndex>=25){
                limit=rowIndex;
            }
            for (let i = limit; i > rowIndex - 4; i--) {
                for (let j = 0; j < this.board[i].length; j++) {
                    if (this.board[i][j] == 2) {
                        this.board[i][j] = 1;
                    }
                }
            }
        }


    }
}

function sendNewBoard(){
    return new Board(); //function that sends a new board object for each player that is used to maintain a session
}

function initializeBoard(columns, rows){ // function that initializes the board for each player in the constructor
    let arr= new Array(rows);
    for( let i=0; i< rows; i++) {
        arr[i]=new Array(columns);
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j]=0;
            if(i==rows-1){
                arr[i][j]=1;//generates an initial floor of 1s
            }
        }
    }
    return arr;
};


module.exports=sendNewBoard;


