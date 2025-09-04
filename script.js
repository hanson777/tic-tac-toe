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
        {name: playerOneName, symbol: "O"},
        {name: playerTwoName, symbol: "X"}
    ]

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer

    const playRound = (row, col) => {
        board.clickCell(row, col, activePlayer);
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        checkBoard();
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
        for(let i = 0; i < 3; i++){
            if((board.getBoard()[0][i].getValue() === board.getBoard()[1][i].getValue()) && board.getBoard()[1][i].getValue() === board.getBoard()[2][i].getValue()){
                endGame(board.getBoard()[0][i].getValue());
                return;
            }
        }

        // Diagonal 
        if((board.getBoard()[0][0].getValue() === board.getBoard()[1][1].getValue()) && board.getBoard()[2][2].getValue() === board.getBoard()[1][1].getValue()){
            endGame(board.getBoard()[0][0].getValue());
            return;
        }

        if((board.getBoard()[0][2].getValue() === board.getBoard()[1][1].getValue()) && board.getBoard()[2][0].getValue() === board.getBoard()[1][1].getValue()){
            endGame(board.getBoard()[0][2].getValue());
            return;
        }

    }

    const endGame = (player) => {
    setTimeout(() => {
        alert(`${player.name} has won the game!`);
    }, 0);
}

    return {board, getActivePlayer, playRound, checkBoard, endGame}
}

const ScreenController = function () {

    const game = GameController();

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const button = document.createElement("button");
            button.classList.add("button")
            button.setAttribute("data-row", i);
            button.setAttribute("data-col", j)
            document.querySelector(".container").appendChild(button);
        }
    }

    document.addEventListener ("click", (event) => {
        const target = event.target;
        if (target.classList.contains("button") && !target.classList.contains("clicked")) {
            target.textContent = game.getActivePlayer().symbol;
            target.classList.add("clicked");
            game.playRound(target.dataset.row, target.dataset.col);
        }
    })
}

const game = ScreenController();

