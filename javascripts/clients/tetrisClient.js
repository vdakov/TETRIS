const board = document.querySelector("#board"); //gets the board div
initializeBoard(27, 10); //initializes the board in the standard tetris board size
const rows = document.querySelectorAll(".row"); //gets an array of all row divs
let playerId;
const playerName = document.querySelector("#user");
const timer=document.querySelector("#timer");
timer.innerHTML="";
let minutes=0;
let seconds=0;
let globalTime=0;
colors=['yellow','blue','red','green','purple','cyan','lime','magenta','orange'];
let currentColor=colors[Math.floor(Math.random()*colors.length)];


let innerBoard = new Array(rows.length); //creates the board of 1s and 0s on which the actual computations are done
for (let i = 0; i < innerBoard.length; i++) {
    innerBoard[i] = new Array(rows[i].childElementCount); // creates each computational row in the innerBoard arr
    for (let j = 0; j < innerBoard[i].length; j++) {
        innerBoard[i][j] = 0; // 0 values have no piece on them, 1s have a piece on them
    }
}

requestId();


function initializeBoard(rows, columns) { // function that initializes the board

    for (let i = 0; i < rows; i++) {
        let row = document.createElement("div"); // creates a new element in the HTML
        board.appendChild(row).className = "row"; // appends a new child to the row div
        for (let j = 0; j < columns; j++) {
            let cell = document.createElement("div"); // creates a new cell div that will be modified to be a block by the css
            row.appendChild(cell).className = "cell"; // appends that child to the newly created row
        }
    }
};

async function requestId() {
    const requestURL = "http://localhost:8080/game/getPlayerId";
    const request = new Request(requestURL);
    const response = await fetch(request);


    let id = await response.json();
    playerId = id.id;

    requestName(playerId);

}

async function requestName(id) {
    const requestURL = "http://localhost:8080/game/" + id + "/getPlayerName";
    const request = new Request(requestURL);
    const response = await fetch(request);

    let name = await response.json();
    console.log(name.player);
    playerName.innerHTML = "WELCOME " + name.player;

}


async function requestNewBoard() {
    const requestURL = "http://localhost:8080/game/" + playerId + "/newBoard";
    const request = new Request(requestURL);
    const response = await fetch(request);

    let newBoard = await response.json();
    console.log(newBoard);

    for (let i = 0; i < innerBoard.length; i++) {
        for (let j = 0; j < innerBoard[i].length; j++) {
            innerBoard[i][j] = newBoard.board[i][j];
        }
    }

};

async function controls(e) {
    let requestURL = "http://localhost:8080/game/" + playerId;


    if (e.keyCode === 37) {
        requestURL = requestURL + "/left";


    } //left

    if (e.keyCode === 39) {
        requestURL = requestURL + "/right";
    } //right

    if (e.keyCode === 38) {
        requestURL = requestURL + "/rotate";
    }
    //up(rotate)

    if (e.keyCode === 40) {
        requestURL = requestURL + "/down";
    }//down

    if(e.keyCode === 32){
        requestURL = requestURL + "/space";
    }

    let request = new Request(requestURL);
    let response = await fetch(request);
    let newBoard = await response.json();
    console.log(newBoard);

    for (let i = 0; i < innerBoard.length; i++) {
        for (let j = 0; j < innerBoard[i].length; j++) {
            innerBoard[i][j] = newBoard.board[i][j];
        }
    }


};

document.addEventListener('keyup', controls);


function colorCells() {

    for (let i = 0; i < innerBoard.length-1; i++) {
        for (let j = 0; j < innerBoard[i].length; j++) {
            if (innerBoard[i][j] == 1) {
                rows[i].childNodes[j].style.backgroundColor = 'white';
                rows[i].childNodes[j].style.border= '0.0001px solid gray;'
            } else
                if (innerBoard[i][j] >=2) {
                rows[i].childNodes[j].style.backgroundColor = currentColor;
                rows[i].childNodes[j].style.border= '0.0001px solid gray;'
            } else if (innerBoard[i][j] ==0) {
                rows[i].childNodes[j].style.backgroundColor = 'black';
                rows[i].childNodes[j].style.border= '0.0001px solid gray;'
            }
        }
    }
}

function appendTime(){
    seconds++;
    globalTime++;
    if(seconds==60){
        minutes++;
        seconds=0;
    }
    let minuteString=""+ minutes;
    let secondString=""+ seconds;
    if(minutes<10){
        minuteString="0"+ minuteString;
    }

    if(seconds<10){
        secondString="0"+ secondString;
    }

    timer.innerHTML=minuteString+":"+secondString;

}

async function fallenPiece(){
    const requestURL = "http://localhost:8080/game/" + playerId + "/fallenPiece";
    const request = new Request(requestURL);
    const response = await fetch(request);

    let fallenPiece = await response.json();

    if(fallenPiece){
        currentColor=colors[Math.floor(Math.random()*colors.length)];
    }
}


setInterval(colorCells, 100);
setInterval(requestNewBoard, 500);
setInterval(fallenPiece, 500);
setInterval(appendTime,1000);

