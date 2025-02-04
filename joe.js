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

// startGame:
//      Randomizes who goes first, asks for player input, calls legalMove.
function startGame(){
    // Turn Randomization
    let counter = Math.round(Math.random());
    if (counter == 0) player = "x";
    else player = "o";
    // Variable Predefinition
    let gameWinner = "n";
    while (gameWinner == "n"){
        // Placing Move
        placeTurn(player, getTurn(player));
        displayBoard();
        // Board Display
        // alert(board[0] + " | " + board[1] + " | " + board[2] + "\n--------\n" + board[3] + " | " + board[4] + " | " + board[5] + "\n--------\n" + board[6] + " | " + board[7] + " | " + board[8]);
        alert("HGELLO")
        if (player == "x") player = "o";
        else player = "o";
    }
}

function placeTurn(player, move){
    for (let row = 0; row < 3; row++){
        for (let col = 0; col < 3; col++){
            if (hBoard[row][col] == move){
                board[row][col] = player;
            }
        }
    }
    //alert(board.toString());
}

function displayBoard(){
    let boardDisplay = "";
    for (let row = 0; row < 3; row++){
        for (let col = 0; col < 3; col++){
            boardDisplay += board[row][col]
            if (col < 2){
                boardDisplay += " | ";
            }
        }
        boardDisplay += "\n"
    }
    alert(boardDisplay);
}

function getTurn(player){
    let move = parseInt(prompt("Now, player " + player + " the floor is yours, which spot would you like to go on? Choose from 1-9."));
    // alert(board[move - 1] + legalMove(move))
    while (goodMoves.includes(move) == false) {
        alert("The specified number " + move + " was not a valid space. Let's try that again!");
        move = parseInt(prompt("Now, player " + player + " the floor is yours, which spot would you like to go on? Choose from 1-9."));
    }
    while (legalMove(move) != true) {
        alert("Uh oh! This spot seems to be taken, please try again.");
        move = parseInt(prompt("Now, player " + player + " the floor is yours, which spot would you like to go on? Choose from 1-9."));
    }
    alert("e " + move);
    return move;
}

// legalMove:
//      Validates player's move, checking whether the space is real or not and if the space is taken.
function legalMove(move){
    for (let row = 0; row < 3; row++){
        for (let col = 0; col < 3; col++){
            if (hBoard[row][col] == move){
                if (board[row][col] != "-") return false;
            }
        }
    }
    return true;
    //alert(board.toString());
}