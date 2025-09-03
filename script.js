const Gameboard = function () {
    const board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i][j] = Cell();
        }
    }

    const getBoard = () => board;

    const clickCell = (row, column, player) => {
        board[row][column].setValue(player);

    }

    return {getBoard, clickCell};
};

const Cell = function () {
    let value = null; 

    const setValue = (player) => value = player;

    const getValue = () => value;

    return {setValue, getValue}
}

const GameController = function (playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();

    const players = [
        {name: playerOneName, symbol: 0},
        {name: playerTwoName, symbol: 1}
    ]

    const getPlayers = () => players;

    let activePlayer = players[0];

    const playRound = (row, col) => {
        board.clickCell(row, col, activePlayer);
        activePlayer = (activePlayer = players[0]) ? (activePlayer = players[1]) : (activePlayer = players[0]);

    }

    const checkBoard = () => {
        // Rows 
        for(let i = 0; i < 3; i++){
            if((board.getBoard()[i][1].getValue() === board.getBoard()[i][0].getValue()) && board.getBoard()[i][1].getValue() === board.getBoard()[i][2].getValue()){
                endGame(board.getBoard()[i][0].getValue());
                return;
            }
        }

        // Cols 
        for(let i = 1; i < 3; i++){
            if((board.getBoard()[0][i].getValue() === board.getBoard()[1][i].getValue()) && board.getBoard()[1][i].getValue() === board.getBoard()[2][i].getValue()){
                endGame(board.getBoard()[0][i].getValue());
                return;
            }
        }

        // Diagonal 
        if((board.getBoard()[0][0].getValue() === board.getBoard()[1][1].getValue() && board.getBoard()[2][2].getValue())){
            endGame(board.getBoard()[0][0].getValue());
            return;
        }

        if((board.getBoard()[0][2].getValue() === board.getBoard()[1][1].getValue() && board.getBoard()[2][0].getValue())){
            endGame(board.getBoard()[0][2].getValue());
            return;
        }

    }

    const endGame = (player) => {
        console.log(`${player} has won the game!`)
    }

    return {board, getPlayers, activePlayer, playRound, checkBoard, endGame}
}

const game = GameController();
game.playRound(0,0);
game.playRound(2,2);
game.playRound(0,1);
game.playRound(2,1);
game.playRound(0,2);
game.checkBoard();


