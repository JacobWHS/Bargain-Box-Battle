// CAUTION: THIS CODE MAY CAUSE YOU TO LOSE BRAIN CELLS.

// IT IS STRICTLY RECOMMENDED THAT VIEWERS CARRY INTELLIGENCE QUOTIENT SUPPLEMENTS WHEN OBSERVING SUCH CODE.

// THANK YOU FOR YOUR COMPLIANCE.


// GLOBAL VARIABLES

var board = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]];

// WIN ARRAYS
var goodMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var hBoard = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
var vBoard = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
var dBoard = [[1, 5, 9], [3, 5, 7], [9, 5, 1]];

// FUNCTIONS

function dataChangeTest(){
    let target = document.querySelector(".parent div:nth-child(1)");
    target.setAttribute("data-status", "x");
    let value = target.getAttribute('data-status');
    target.innerHTML = value;
}

function placeMove(id){
    let player = localStorage.getItem("player");
    if (id.innerHTML.includes("-")){
        id.innerHTML = id.innerHTML.replace("-", player);
        if (player == "X") player = "O"; else player = "X";
        localStorage.setItem("player", player);
        document.getElementById("textStatus").innerHTML = player + ", it's your turn!";
    }
    else {
        // alert("This spot's full!"); // TODO: Change text status instead of alert
        document.getElementById("textStatus").innerHTML = "This spot's full, please try again.";
    }
    checkWinner();
}

function startGame(){
    let counter = Math.round(Math.random());
    if (counter == 0) localStorage.setItem("player", "X");
    else localStorage.setItem("player", "O");
    let player = localStorage.getItem("player");
    document.getElementById("textStatus").innerHTML = player + ", it's your turn!";
}


//1-9 Div checking, maybe??
function checkWinner(){
    let player = localStorage.getItem("player");
    // Full board check
    let winner = "";
    // let x = 0;
    // let o = 0;
    let board = document.getElementById("board");
    console.log(board.dataset.test);
    for (let box = 0; box < board.childNodes.length; box++) {
        if (box == 1 || box == 4 || box == 9){
            console.log(board.childNodes[1].dataset.status); // this should be the div, where the data attribute resides
            let test = board.childNodes[box].firstChild.innerHTML; // this should be the span, where the innerHTML is. 
            if (test == player) console.log(player);
        }
        // if (board.childNodes[i].className == "4") {
        //   winner = board.childNodes[i];
        //   break;
        // }        
    }
//     for (let cnt = 1; cnt <= 9; cnt++){
//         let spot = document.getElementsByClassName("div" + cnt)[0].innerHTML;
//         if (spot.includes("-")) return;
//     }
//     if (winner != "X" || "O") document.getElementById("textStatus").innerHTML = "It's a tie!";
//     else document.getElementById("textStatus").innerHTML = winner + " wins!";
}

function getSpot(id){
    let spot = document.getElementsByClassName("div" + id)[0].innerHTML;
    spot.replaceAll("<span>",""); spot.replaceAll("</span>","");
    return spot;
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
function startGameBak(){
    // Turn Randomization
    let counter = Math.round(Math.random());
    if (counter == 0) player = "x";
    else player = "o";
    // Variable Predefinition
    let gameWinner = "n";
    while (gameWinner == "n"){
        // Placing Move
        let move = getTurn(player);
        if (move == 0) break;
        // alert("getTurn finished, move to placeTurn.");
        placeTurn(player, move);
        // alert("placeTurn finished, move to displayBoard.");
        // Board Display
        alert("Checking winner for " + displayBoard());
        // JW: function checkWinner(move){
        if (checkWinner(move, player)) gameWinner = player;
        else if (!isntFull()) {
            alert(board);
            // alert(board.includes("-"));
            gameWinner = "d";
        }
        if (player == "x") player = "o";
        else player = "x";
    }
    if (gameWinner == "d"){
        alert("DRAW!");
    }
}


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
function displayBoard(){
    let boardDisplay = "\n";
    for (let row = 0; row <= 2; row++){
        for (let col = 0; col <= 2; col++){
            boardDisplay += board[row][col]
            if (col < 2){
                boardDisplay += " | ";
            }
        }
        boardDisplay += "\n";
    }
    //alert(boardDisplay);
    return boardDisplay;
}

// getTurn:
//      Prompts the player to make their turn, validates and returns it.
function getTurn(player){
    player = player.toUpperCase();
    let move = parseInt(prompt(displayBoard() + "Now, player " + player + " the floor is yours, which spot would you like to go on? Choose from 1-9."));
    if (move == 0) return 0;
    while (isNaN(move)) {
        alert("The specified message was not a valid space. Let's try that again!");
        move = parseInt(prompt("Now, player " + player + " the floor is yours, which spot would you like to go on? Choose from 1-9." + displayBoard()));
    }
    while (goodMoves.includes(move) == false) {
        alert("The specified number " + move + " was not a valid space. Let's try that again!");
        move = parseInt(prompt("Now, player " + player + " the floor is yours, which spot would you like to go on? Choose from 1-9."  + displayBoard()));
    }
    while (legalMove(move) != true) {
        alert("Uh oh! This spot seems to be taken, please try again.");
        move = parseInt(prompt("Now, player " + player + " the floor is yours, which spot would you like to go on? Choose from 1-9." + displayBoard()));
    }
    return move;
}

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
