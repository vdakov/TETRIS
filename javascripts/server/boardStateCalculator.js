const express= require('express');
const pieceGenerator= require('C:\\Users\\vdako\\WebstormProjects\\memorygame\\javascripts\\server\\pieces.js');
//const board= initializeBoard(10,27);
// let newPiece=24; //temp way to test gravity system

class boardA {
    constructor(){
        this.board=initializeBoard(10,27);
        this.newPiece=24;
    }


    checkForContact(){

    }

    appendNewPieceToBoard(piece){
        for(let i=0; i<piece.length; i++){
            for(let j=0;j<piece[i].length;j++){
                this.board[i][j]=piece[i][j];
            }
        }
    }

    nextBoardState(){
        if(this.newPiece==24){
            this.appendNewPieceToBoard(pieceGenerator());
            this.newPiece=0;
        }
        this.oneGravityTick();
        this.newPiece++;


        return this.board;
    }

    oneGravityTick(){

        for( let i=this.board.length-1; i> 0; i--) {
            for (let j = 0; j < this.board[i].length; j++) {
                if(this.board[i][j]==1 && this.board[i-1][j]==2){
                    this.convert2sTo1s(i-1);
                }else if(this.board[i][j]==0 && this.board[i-1][j]==2){
                    this.board[i][j]=2;
                    this.board[i-1][j]=0;
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
    return new boardA();
}

function initializeBoard(columns, rows){ // function that initializes the board
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

// function checkForContact(){
//
// }
//
// function appendNewPieceToBoard(piece){
//     for(let i=0; i<piece.length; i++){
//         for(let j=0;j<piece[i].length;j++){
//             board[i][j]=piece[i][j];
//         }
//     }
// };
//
// function nextBoardState(){
//     if(newPiece==24){
//         appendNewPieceToBoard(pieceGenerator());
//         newPiece=0;
//     }
//     oneGravityTick();
//     newPiece++;
//
//
//     return board;
// };
//
// function oneGravityTick(){
//
//     for( let i=board.length-1; i> 0; i--) {
//         for (let j = 0; j < board[i].length; j++) {
//             if(board[i][j]==1 && board[i-1][j]==2){
//                 convert2sTo1s(i-1);
//             }else if(board[i][j]==0 && board[i-1][j]==2){
//                 board[i][j]=2;
//                 board[i-1][j]=0;
//             }
//         }
//     }
//
// };
//
// function convert2sTo1s(rowIndex){
//     if(rowIndex<3){
//         for(let i=rowIndex;i>=0;i--){
//             for(let j=0;j<board[i].length;j++){
//                 if(board[i][j]==2){
//                     board[i][j]=1;
//                 }
//             }
//         }
//     }else{
//         for(let i=rowIndex;i>rowIndex-4;i--){
//             for(let j=0;j<board[i].length;j++){
//                 if(board[i][j]==2){
//                     board[i][j]=1;
//                 }
//             }
//         }
//     }
//
// }

module.exports=sendNewBoard;


