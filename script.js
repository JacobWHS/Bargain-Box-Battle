// CAUTION: THIS CODE MAY CAUSE YOU TO LOSE BRAIN CELLS.



// IT IS STRICTLY RECOMMENDED THAT VIEWERS CARRY INTELLIGENCE QUOTIENT SUPPLEMENTS WHEN OBSERVING THE FOLLOWING.



// THANK YOU FOR YOUR COMPLIANCE.


// GLOBAL VARIABLES

var board = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]];
var boardConvert = [[-1, -1], [0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
var element = 1;
var boardTarget = board[boardConvert[element][0], boardConvert[element][1]];

// WIN ARRAYS
var goodMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var hBoard = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
var vBoard = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
var dBoard = [[1, 5, 9], [3, 5, 7], [9, 5, 1]];

// FUNCTIONS

// startGame:
//      Randomizes who goes first, asks for player input, calls legalMove.
function startGame(){
    // Turn Randomization
    board = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]];
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
        alert(displayBoard());
        // JW: function checkWinner(move){
        if (checkWinner(move, player)) gameWinner = player;
        else if (!isntFull()) gameWinner = "d";
        if (player == "x") player = "o";
        else player = "x";
    }
    if (gameWinner == "d"){
        alert("- DRAW! -");
    }
    else if (gameWinner == "x" || "o"){
        alert("+ Player " + gameWinner.toUpperCase() + " WINS! +");
    }
    let again = confirm("Say, shall we play once more?")
    if (again == true) startGame();
    else {
        alert("Thank you for playing!"), window.close(); // Just learned that you could put commas n stuff this is awesome
    }
}


// placeTurn:
//      Places the specified player's move, converting their single digit (move) to two separate numbers. One for the row, and the other for the column.
function placeTurn(player, move){
    for (let row = 0; row <= 2; row++){
        for (let col = 0; col <= 2; col++){
            if (hBoard[row][col] == move){
                board[row][col] = player;
            }
        }
    }
}

function isntFull(){
    for (let row = 0; row <= 2; row++){
        for (let col = 0; col <= 2; col++){
            if (board[row][col] == "-") return true;   
        }
    }
    return false;
}

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
function legalMove(move){
    for (let row = 0; row <= 2; row++){
        for (let col = 0; col <= 2; col++){
            if (hBoard[row][col] == move){
                if (board[row][col] != "-") return false;
            }
        }
    }
    return true;
}


// checkSet:
//      More of a subfunction, used within checkWinner to look for any winning patterns using our board arrays.
function checkSet(player, move, target){
    let win = false;
    for (let row = 0; row <= 2; row++){
        switch (target){ // Target must be h or v to check for horiz and vert, otherwise it will default to diagonal.
            case "h":
                testArray = hBoard[row];
                break;
            case "v":
                testArray = vBoard[row];
                break;
            default:
                testArray = dBoard[row];
                break;
        }
        if (testArray.includes(move)){
            // console.log("Testing " + testArray.toString() + " includes " + move);
            win = checkArray(player, testArray);
            /* New Function: Check board for player values in testArray correspondences */
            // if (testArray[0] == testArray[1] && testArray[1] == testArray[2]) win = true;
        }
    }
    return win;
}


function checkArray(player, testArray){
    let xcoord = 0;
    let ycoord = 0;
    
    for (let inc = 0; inc < 3; inc++){
        let source = testArray[inc];
        xcoord = boardConvert[source][0];
        ycoord = boardConvert[source][1];
        if (board[xcoord][ycoord] != player) return false;
    }
    return true;
}

// checkWinner:
//      Uses checkSet() for all combinations of winning.
function checkWinner(move, player){
    // Winner variable deprecated
    if (checkSet(player, move, "h")) return true;
    if (checkSet(player, move, "v")) return true;
    if (checkSet(player, move, "d")) return true;
    return false;
    // I DIDN'T KNOW YOU COULD STACK IFS LIKE THIS WHAT THE SIGMA?
    // JW: I do not think you can, actually.  I changed it to include {} - show me where you
    // else if (move < 4) {
    //     if (checkSet(move, vBoard)) return true;
    // }
    // else if (move % 2 == 1) {
    //     if (checkSet(move, dBoard)) return true;
    // }
}