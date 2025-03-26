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

// LOAD TEST (CREATE STUFF?)
// TODO: Create reset button in JS instead of HTML
// NEAR FUTURE: Replace divs in HTML with javascript divs soon

// Tile Creation
let bParent = document.getElementById("board");
for (let cnt = 1; cnt <= 9; cnt++){
    console.log(cnt);
    let tile = document.createElement("div");
    tile.onclick = function() { placeMove(this); }
    title.classList.add("div" + cnt);
    title.dataset.address = cnt;
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


// THANK YOU FOR YOUR SERVICE, OLD FRIEND!
// function dataChangeTest(){
//     let target = document.querySelector(".parent div:nth-child(1)");
//     target.setAttribute("data-status", "x");
//     let value = target.getAttribute('data-status');
//     target.innerHTML = value;
// }

function placeMove(id){
    let player = localStorage.getItem("player");
    let winner = checkWinner();
    if (winner == "no winner"){
        if (id.dataset.status == "-"){
            // id.innerHTML = id.innerHTML.replace("-", player);
            id.setAttribute("data-status", player);
            winner = checkWinner();
            console.log("placeMove() winner = " + winner);
            if (winner == "no winner"){
                if (player == "X") player = "O"; else player = "X";
                localStorage.setItem("player", player);
                document.getElementById("textStatus").innerHTML = player + ", it's your turn!";
                console.log("TURN SWAPPED, IHTML MODIFIED.")
            }
        }
        else document.getElementById("textStatus").innerHTML = "This spot's full, please try again.";
            // alert("This spot's full!"); // TODO: Change text status instead of alert
        // else document.getElementById("textStatus").innerHTML = "The game has already ended, if you'd like to play again, press the \"Play Again\" button.";
        // else alert("someone's already won! please reload the page.")
    }
    else document.getElementById("textStatus").innerHTML = "The game has already ended, if you'd like to play again, press the \"Play Again\" button.";
}

function startGame(){
    let counter = Math.round(Math.random());
    if (counter == 0) localStorage.setItem("player", "X");
    else localStorage.setItem("player", "O");
    let player = localStorage.getItem("player");
    // console.log("GAME STARTED startGame()");
    document.getElementById("textStatus").innerHTML = player + ", it's your turn!";
}


//1-9 Div checking, maybe??
function checkWinner(){
    let player = localStorage.getItem("player");
    // Full board check
    let winner = "no winner";
    // let x = 0;
    // let o = 0;
    let board = document.getElementById("board");
    let bttn = document.getElementById("reset");
    // console.log(board.dataset.test);
    let box = 0;
    while (winner == "no winner" && box < 9) { // replace 9 with board.childNodes.length
        // console.log(box);
        // console.log("cn - 1" + board.childNodes.length - 1);
        // console.log("cn " + board.childNodes.length);
        // if (board.children[box].innerHTML == player) {
        //     if (checkAct(box, player)) winner = player;
        //     if (checkAct(box, player, 3)) winner = player;
        // }
        // Check horizontal win
        let ctrl = board.children[box].dataset.status;
        if (ctrl == player) {
            console.log("CHECKACT CALLING");
            if (box == 0 || box == 3 || box == 6) if (checkAct(box, player)) winner = player;
            if (box == 0 || box == 1 || box == 2) if (checkAct(box, player, "v")) winner = player;
            if (box == 0 || box == 4 || box == 8) if (checkAct(box, player, "d")) winner = player;
            if (box == 2 || box == 4 || box == 6) if (checkAct(box, player, "a")) winner = player;
            console.log("checkWinner() winner = " + winner);
        }
        // else if (box == 0 || box == 1 || box == 2){
        //     let ctrl = board.children[box].innerHTML;
        //     if (ctrl == player) {
        //         console.log("CHECKCOL CALLING");
        //         if (checkAct(box, player, "v")) winner = player;
        //         console.log("winner = " + winner);
        //         }
        //     }
        box++;
        // else if (winner == "" && (box == 2 || box == 5 || box == 8)){
            
        // if (board.childNodes[i].className == "4") {
        //   winner = board.childNodes[i];
        //   break;
        // }     
    }   
    for (let cnt = 1; cnt <= 9; cnt++){
        let spot = document.getElementsByClassName("div" + cnt)[0];
        if (spot.dataset.status == "-") break;
        if (cnt == 9) winner = "FULL";
    }
    if (winner != "no winner"){
        board.style.transition = "opacity 0.5s";
        board.style.opacity = 0;
        setTimeout(function() {
            bttn.style.transition = "left 0.5s";
            bttn.style.left = -200;
        }, 500);
        setTimeout(function() {
            board.style.display = "none";
          }, 500);
    }
    if (winner == "FULL"){
        console.log("no winner found");
        document.getElementById("textStatus").innerHTML = "It's a tie!";
    }
    else if (winner != "no winner") {
        console.log("winner exists");
        document.getElementById("textStatus").innerHTML = winner + " wins!";
        console.log(winner + " wins!");
    }
    return winner;
}

function checkAct(box, player, type="h"){ // default param is "h" which means horizontal, i learned this from another coding language, does it work? Let's see.
    let board = document.getElementById("board");
    console.log("checkAct(" + box + ", " + player + ")");
    console.log("Specified Act: " + type);
    switch (type){
        case "h": // Horizontal
            if (board.children[box + 1].dataset.status == player && board.children[box + 2].dataset.status == player) return true;
            break;
        case "v": // Vertical
            if (board.children[box + 3].dataset.status == player && board.children[box + 6].dataset.status == player) return true;
            break;
        case "d": // Diagonal
            if (board.children[0].dataset.status == player && board.children[4].dataset.status == player && board.children[8].dataset.status == player) return true;
            break;
        default: // Reverse Diagonal or Antidiagonal incase i need 1 word to make this look cleaner
            if (board.children[2].dataset.status == player && board.children[4].dataset.status == player && board.children[6].dataset.status == player) return true;    
            break;
    }
    return false;
    // let box2 = box + 1; let board = document.getElementById("board");
    // if (box + inc > 9) if (board.children[box + inc].innerHTML == player && board.children[box2 + inc].innerHTML == player) return true;
    // else if (board.children[box - inc].innerHTML == player && board.children[box2 - inc].innerHTML == player) return true;
    // else return false;
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