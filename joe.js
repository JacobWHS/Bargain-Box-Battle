// CAUTION: THIS CODE MAY CAUSE YOU TO LOSE BRAIN CELLS.

// IT IS STRICTLY RECOMMENDED THAT VIEWERS CARRY INTELLIGENCE QUOTIENT SUPPLEMENTS WHEN OBSERVING SUCH CODE.

// THANK YOU FOR YOUR COMPLIANCE.


// GLOBAL VARIBLES

var board = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]];

// WIN ARRAYS
var hBoard = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
var vBoard = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
var dBoard = [[1, 5, 9], [3, 5, 7], [9, 5, 1]];

// FUNCTIONS

// startGame:
//      Randomizes who goes first, asks for player input, calls legalMove.
function startGame(){
    let counter = 0;
    let gameWinner = "no";
    while (gameWinner == "no"){
        if (counter % 2 == 0) player = "X";
        else player = "O";
        let move = prompt("Now, player " + player + " the floor is yours, which spot would you like to go on? Choose from 1-9.");
        if (legalMove(move) == false) alert("woah u can't do that (UNFINISHED)")
    }
}

function legalMove(move){
    move = parseInt(move)
    if (move > 0 && board[move] == "-") return true;
    else return false;
}