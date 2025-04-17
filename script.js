// CAUTION: THIS CODE MAY CAUSE YOU TO LOSE BRAIN CELLS.
// IT IS STRICTLY RECOMMENDED THAT VIEWERS CARRY INTELLIGENCE QUOTIENT SUPPLEMENTS WHEN OBSERVING SUCH CODE.
// THANK YOU FOR YOUR COMPLIANCE.


// GLOBAL VARIABLES

var board = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]];

// OTHER
var player = "X";
var fullBoard = false;
var boardElem = document.getElementById("board");
var bttnElem = document.getElementById("reset");

// WIN ARRAYS
var goodMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var movesTaken = [];
var hBoard = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
var vBoard = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
var dBoard = [[1, 5, 9], [3, 5, 7], [9, 5, 1]];

// LOAD TEST (CREATE STUFF?)
// TODO: Create reset button in JS instead of HTML
// NEAR FUTURE: Replace divs in HTML with javascript divs soon

// Tile Creation
let bParent = document.getElementById("board");
for (let cnt = 1; cnt <= 9; cnt++){
    let tile = document.createElement("div");
    tile.onclick = function() { player = "X"; placeMove(this); }
    tile.classList.add("div" + cnt);
    tile.dataset.address = cnt;
    tile.dataset.status = "-";
    bParent.appendChild(tile);
}

// Reset Button Creation
var bttnCont = document.getElementById("cont-button");
var rstBttn = document.createElement("button");
rstBttn.textContent = "• RESET";
rstBttn.id = "myButton";

// Reset Button Styling
rstBttn.style.border = "none";
rstBttn.style.display = "block";
rstBttn.style.backgroundColor = "rgb(221, 255, 255)";
rstBttn.style.padding = "25px";
rstBttn.style.fontFamily = "'Montserrat', serif";
// border-bottom-color rgb(33, 150, 243)
// border-left-color rgb(33, 150, 243)
// border-left-style solid
// border-left-width 5.45455px
// border-right-color rgb(33, 150, 243)
// border-top-color rgb(33, 150, 243)

// Button Action
rstBttn.onclick = function() { location.reload(); }
  
bttnCont.appendChild(rstBttn);

// FUNCTIONS


/**
 * placeMove - Player move placement
 * @param {integer} move 
 */
function placeMove(id){
    let moveID = id.dataset.address;
    moveID = parseInt(moveID);
    console.log(" - Before " + goodMoves.toString());
    goodMoves.splice(goodMoves.indexOf(moveID), 1);
    console.log(" - After " + goodMoves.toString());
    movesTaken.push(moveID);
    let winner = checkWinner("X");
    let textStatus = "unset status";
    if (winner == false){
        if (id.dataset.status == "-"){
            // id.innerHTML = id.innerHTML.replace("-", player);
            id.setAttribute("data-status", player);
            winner = checkWinner("X");
            if (winner == false) pcTurn();
            textStatus = player + ", it's your turn!";
        }
        else {
            // console.warn("SPOT FULL TEST"); 
            textStatus = "This spot's full, please try again.";
        }
        document.getElementById("textStatus").innerHTML = textStatus;
        // displayStatus();
    }
    else displayStatus();
}

/**
 * placeMoveCPU - Computer move placement
 * @param {integer} move 
 */
function placeMoveCPU(move){
    goodMoves.slice(goodMoves.indexOf(move) - 1);
    movesTaken.push(move);

    console.log(" - move - " + move);
    move = parseInt(move);
    const element = document.querySelector("[data-address=\"" + move + "\"]");
    console.log(" - element = " + move);
    element.setAttribute("data-status", "O");
}

/**
 * pcTurn - PC turn prediction
 */
function pcTurn(){
    console.warn("pcTurn()");
    // Full board check
    let winner = "no winner";
    let move = -1;
    // console.log("Move is equal to -1!")
    // Check Rows
    for (let box = 1; box <= 7; box += 3){
        if (pcCheckRow(box)) move = pcBlockRow(box);
    }
    // move = 0; // Temporary Anti-crash - Remove upon replacement
    // Check Cols
    for (let box = 1; box <= 3; box++){
        if (pcCheckCol(box)) move = pcBlockCol(box);
    }
    if (move == -1) move = randMove();
    placeMoveCPU(move);
    winner = checkWinner("O");
}   

function pcBlockRow(row){
    for (let box = row; box < row + 3; box++){
        console.log("pcBlockRow - BOX: " + box);
        if (checkPlayer(box) == "-") return box;
    }
    // debugger;
}

function pcBlockCol(col){
    for (let box = col; box < 10; box += 3){
        console.log("pcBlockCol - BOX: " + box);
        if (checkPlayer(box) == "-") return box;
    }
}

function pcBlockDia(col){
    for (let box = col; box < 10; box += 3){
        console.log("pcBlockDia - BOX: " + box);
        if (checkPlayer(box) == "-") return box;
    }
}

/**
 * pcCheckRow - Checks whether a row's x count is greater than two or not.
 * @param {integer} row 
 * @returns 
 */
function pcCheckRow(row){
    let x_count = 0;
    let count = 0;
    for (let box = row; box < row + 3; box++){ 
        // if box contains x add 1 to x_count
        if (movesTaken.includes(box)){
            if (checkPlayer(box) == "X") x_count++;
            count++;
            console.log(" - x_count: " + x_count + " | index: " + movesTaken.indexOf(box));
        }
        // else {
        //     console.log(box + " not in " + movesTaken.toString());
        // }
    }
    if (x_count == 2 && count != 3){ 
        console.error("checkrow true");
        // debugger;
        return true; }
    else return false;
}

/**
 * pcCheckRow - Checks whether a row's x count is greater than two or not.
 * @param {integer} row 
 * @returns 
 */
function pcCheckCol(col){
    let x_count = 0;
    let count = 0;
    for (let box = col; box < 10; box += 3){ 
        // if box contains x add 1 to x_count
        if (movesTaken.includes(box)) {
            if (checkPlayer(box) == "X") x_count++;
            count++;
        }
    }
    if (x_count == 2 && count != 3) {
        console.error("checkcol true");
        return true;}
    else return false;
}

/**
 * pcCheckDiag - Checks whether the diagonal's x count is greater than two or not.
 * @returns 
 */
function pcCheckDiag(){
    let x_count = 0;
    for (let box = row + 1; box < row + 4; box++){ 
        // if box contains x add 1 to x_count
        if (checkPlayer(box) == "X") x_count++;
    }
    if (x_count < 2) return false;
    else return true;
}


/**
 * getRndInteger - Generates a random value between the specified digits.
 * @param {integer} min 
 * @param {integer} max 
 * @returns integer
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/**
 * checkPlayer - Returns the staus of a box (player/empty).
 * @param {integer} address 
 * @returns string
 */
function checkPlayer(address){
    address = parseInt(address);
    switch (document.querySelector("[data-address=\"" + address + "\"]").dataset.status){ // i love switch statements
        case "X":
            return "X";
        case "O":
            return "O";
        default:
            return "-"; // EMPTY
    }
}

function randMove(){
    // let move = 1; // MR M METHOD - BROKEN
    // while(checkPlayer(move) != "-") {
    //     if (!isFull()) break;
    //     move = getRndInteger(1, 9);
    // }
    let move; // DO WHILE METHOD - WORKS PERFECTLY* (MAYBE?)
    do {
        move = getRndInteger(1, 9);
    } while(checkPlayer(move) != "-");
    return move;
}

/**
 * startGame - Turn & Icon randomization. (Disabled)
 */
function startGame(){
    let counter = Math.round(Math.random());
    // console.log("GAME STARTED startGame()");
    document.getElementById("textStatus").innerHTML = player + ", it's your turn!";
}


/**
 * checkWinner - Checks the winner of the game based on a set of hardcoded patterns.
 * @param {string} player 
 * @returns 
 */
function checkWinner(player){
    // Full board check
    let winner = false;
    let box = 0;
    let full = isFull();
    while (winner == false && box < 9 && full == false) {
        let ctrl = boardElem.children[box].dataset.status;
        if (ctrl == player) {
            console.error("CHECKACT CHECKING " + player);
            if (box == 0 || box == 3 || box == 6) if (checkAct(box, player)) winner = player;
            if (box == 0 || box == 1 || box == 2) if (checkAct(box, player, "v")) winner = player;
            if (box == 0 || box == 4 || box == 8) if (checkAct(box, player, "d")) winner = player;
            if (box == 2 || box == 4 || box == 6) if (checkAct(box, player, "a")) winner = player;
            console.log(" - checkWinner() winner = " + winner);
        }
        box++;   
    }   
    return winner;
}

/**
 * displayStatus - Displays the status of the game. (Turns, win conds)
 * Also fades box out (BROKEN*)
 */
function displayStatus(){
    if (winner == true) document.getElementById("textStatus").innerHTML = player + " wins!";
    else if (isFull()) document.getElementById("textStatus").innerHTML = "It's a tie!";
    if (winner == true || isFull()){
        boardElem.style.transition = "opacity 0.5s";
        boardElem.style.opacity = 0;
        setTimeout(function() {
            bttnElem.style.transition = "left 0.5s";
            bttnElem.style.left = -200;
        }, 500);
        setTimeout(function() {
            boardElem.style.display = "none";
          }, 500);
    }
}

/**
 * isFull - Checks whether the board is full.
 * @returns boolean
 */
function isFull(){
    console.log("\n--\nIS FULL IS BEING CALLED \n--\n ");
    // for (let box = 1; box <= 9; box++){
    //     if (checkPlayer(box) == "-") return false;
    // }
    // return true;
}

/**
 * checkAct - Player win condition check; based on selected method
 * @param {integer} box 
 * @param {string} player 
 * @param {string} type 
 * @returns boolean
 */
function checkAct(box, player, type="h"){ // default param is "h" which means horizontal, i learned this from another coding language, does it work? Let's see.
    console.log(" - Specified Act: " + type.toUpperCase());
    switch (type){
        case "h": // Horizontal
            if (boardElem.children[box + 1].dataset.status == player && boardElem.children[box + 2].dataset.status == player) return true;
            break;
        case "v": // Vertical
            if (boardElem.children[box + 3].dataset.status == player && boardElem.children[box + 6].dataset.status == player) return true;
            break;
        case "d": // Diagonal
            if (boardElem.children[0].dataset.status == player && boardElem.children[4].dataset.status == player && boardElem.children[8].dataset.status == player) return true;
            break;
        default: // Reverse Diagonal or Antidiagonal incase i need 1 word to make this look cleaner
            if (boardElem.children[2].dataset.status == player && boardElem.children[4].dataset.status == player && boardElem.children[6].dataset.status == player) return true;    
            break;
    }
    return false;
    // let box2 = box + 1; let board = document.getElementById("board");
    // if (box + inc > 9) if (board.children[box + inc].innerHTML == player && board.children[box2 + inc].innerHTML == player) return true;
    // else if (board.children[box - inc].innerHTML == player && board.children[box2 - inc].innerHTML == player) return true;
    // else return false;
}

/**
 * getSpot - Returns spot of selected ID
 * @param {integer} id 
 * @returns string
 */
function getSpot(id){
    let spot = document.getElementsByClassName("div" + id)[0];
    return spot.dataset.status;
}

// function checkArray(player){
//     for (let inc = 0; inc < 8; inc++){

//         // let source = testArray[inc];
//         // let spot = document.getElementsByClassName("div" + inc)[0].innerHTML;
//         // if (testArray[inc] != player) return false;
//     }
//     return true;
// }


// function checkArrayBak(player, testArray){
//     let xcoord = 0;
//     let ycoord = 0;
    
//     for (let inc = 0; inc < 3; inc++){
//         let source = testArray[inc];
//         xcoord = boardConvert[source][0];
//         ycoord = boardConvert[source][1];
//         if (board[xcoord][ycoord] != player) return false;
//     }
//     return true;
// }

// startGame:
//      Randomizes who goes first, asks for player input, calls legalMove.
// function startGameBak(){
//     // Turn Randomization
//     let counter = Math.round(Math.random());
//     if (counter == 0) player = "x";
//     else player = "o";
//     // Variable Predefinition
//     let gameWinner = "n";
//     while (gameWinner == "n"){
//         // Placing Move
//         let move = getTurn(player);
//         if (move == 0) break;
//         // alert("getTurn finished, move to placeTurn.");
//         placeTurn(player, move);
//         // alert("placeTurn finished, move to displayBoard.");
//         // Board Display
//         console.log("Checking winner for " + displayBoard());
//         // JW: function checkWinner(move){
//         if (checkWinner(move, player)) gameWinner = player;
//         else if (!isntFull()) {
//             alert(board);
//             // alert(board.includes("-"));
//             gameWinner = "d";
//         }
//         if (player == "x") player = "o";
//         else player = "x";
//     }
//     if (gameWinner == "d"){
//         alert("DRAW!");
//     }
// }


// placeTurn:
//      Places the specified player's move, converting their single digit (move) to two separate numbers. One for the row, and the other for the column.
// function placeTurn(player, move){
//     for (let row = 0; row <= 2; row++){
//         for (let col = 0; col <= 2; col++){
//             if (hBoard[row][col] == move){
//                 board[row][col] = player;
//             }
//         }
//     }
// }

// function isntFull(){
//     for (let row = 0; row <= 2; row++){
//         for (let col = 0; col <= 2; col++){
//             if (board[row][col] == "-") return true;   
//         }
//     }
//     return false;
// }

// displayBoard:
//      Displays the board in the typical 2D Tic Tac Toe fashion.
// function displayBoard(){
//     let boardDisplay = "\n";
//     for (let row = 0; row <= 2; row++){
//         for (let col = 0; col <= 2; col++){
//             boardDisplay += board[row][col]
//             if (col < 2){
//                 boardDisplay += " | ";
//             }
//         }
//         boardDisplay += "\n";
//     }
//     //alert(boardDisplay);
//     return boardDisplay;
// }

// getTurn:
//      Prompts the player to make their turn, validates and returns it.
// function getTurn(player){
//     player = player.toUpperCase();
//     let move = parseInt(prompt(displayBoard() + "Now, player " + player + " the floor is yours, which spot would you like to go on? Choose from 1-9."));
//     if (move == 0) return 0;
//     while (isNaN(move)) {
//         alert("The specified message was not a valid space. Let's try that again!");
//         move = parseInt(prompt("Now, player " + player + " the floor is yours, which spot would you like to go on? Choose from 1-9." + displayBoard()));
//     }
//     while (goodMoves.includes(move) == false) {
//         alert("The specified number " + move + " was not a valid space. Let's try that again!");
//         move = parseInt(prompt("Now, player " + player + " the floor is yours, which spot would you like to go on? Choose from 1-9."  + displayBoard()));
//     }
//     while (legalMove(move) != true) {
//         alert("Uh oh! This spot seems to be taken, please try again.");
//         move = parseInt(prompt("Now, player " + player + " the floor is yours, which spot would you like to go on? Choose from 1-9." + displayBoard()));
//     }
//     return move;
// }

// legalMove:
//      Validates player's move, checking whether the space is real or not and if the space is taken.
// function legalMove(move){
//     for (let row = 0; row <= 2; row++){
//         for (let col = 0; col <= 2; col++){
//             if (hBoard[row][col] == move){
//                 if (board[row][col] != "-") return false;
//             }
//         }
//     }
//     return true;
// }


// checkSet:
//      More of a subfunction, used within checkWinner to look for any winning patterns using our board arrays.
// function checkSet(player, move, target){
//     let win = false;
//     for (let row = 0; row <= 2; row++){
//         switch (target){
//             case "h":
//                 testArray = hBoard[row];
//                 break;
//             case "v":
//                 testArray = vBoard[row];
//                 break;
//             default:
//                 testArray = dBoard[row];
//                 break;
//         }
//         if (testArray.includes(move)){
//             console.log("Testing " + testArray.toString() + " includes "+move);
//             /* New Function: Check board for player values in testArray correspondences */
//             // if (testArray[0] == testArray[1] && testArray[1] == testArray[2]) win = true;
//         }
//     }
//     return win;
// }

// checkWinner:
//      Uses checkSet() for all combinations of winning.
// function checkWinner(move, player){
//     // Winner variable deprecated
//     // if (checkSet(player, move, hBoard)) return true;
//     // if (checkSet(player, move, vBoard)) return true;
//     // if (checkSet(player, move, dBoard)) return true;
//     // return false;
//     // I DIDN'T KNOW YOU COULD STACK IFS LIKE THIS WHAT THE SIGMA?
//     // JW: I do not think you can, actually.  I changed it to include {} - show me where you
//     // else if (move < 4) {
//     //     if (checkSet(move, vBoard)) return true;
//     // }
//     // else if (move % 2 == 1) {
//     //     if (checkSet(move, dBoard)) return true;
//     // }
// }