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

const GameController = function (playerOneName = "Player One", playerTwoName = "Player Two", start) {
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
        for (let i = 0; i < 3; i++) {
            const row = board.getBoard()[i];
            if (
                row[0].getValue() !== null &&
                row[0].getValue() === row[1].getValue() &&
                row[1].getValue() === row[2].getValue()
            ) {
                endGame(row[0].getValue());
                return;
            }
        }


        // Cols 
        for (let i = 0; i < 3; i++) {
            if (
                board.getBoard()[0][i].getValue() !== null &&
                board.getBoard()[0][i].getValue() === board.getBoard()[1][i].getValue() &&
                board.getBoard()[1][i].getValue() === board.getBoard()[2][i].getValue()
            ) {
                endGame(board.getBoard()[0][i].getValue());
                return;
            }
        }

        // Diagonals
        if (
            board.getBoard()[0][0].getValue() !== null &&
            board.getBoard()[0][0].getValue() === board.getBoard()[1][1].getValue() &&
            board.getBoard()[1][1].getValue() === board.getBoard()[2][2].getValue()
        ) {
            endGame(board.getBoard()[0][0].getValue());
            return;
        }

        if (
            board.getBoard()[0][2].getValue() !== null &&
            board.getBoard()[0][2].getValue() === board.getBoard()[1][1].getValue() &&
            board.getBoard()[1][1].getValue() === board.getBoard()[2][0].getValue()
        ) {
            endGame(board.getBoard()[0][2].getValue());
            return;
        }

        let draw = true;

        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(board.getBoard()[i][j].getValue() === null){
                    draw = false;
                }
            }
        }

        if(draw) {
            drawGame();
        }
    }

    const endGame = (player) => {
        setTimeout(() => {
            alert(`${player.name} has won the game!`);
            document.querySelector(".container").innerHTML = "";
            start();
        }, 0);
    
    }

    const drawGame = () => {
        setTimeout(() => {
            alert("This game is a draw!");
            document.querySelector(".container").innerHTML = "";
            start();
        }, 0);
    }


    return {board, getActivePlayer, playRound, checkBoard}
}

const ScreenController = function () {

    const start = () => {

        const game = GameController("P1", "P2", start);

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const button = document.createElement("button");
                button.classList.add("button")
                document.querySelector(".container").appendChild(button);

                button.addEventListener ("click", () => {
                   if (!button.classList.contains("clicked")) {
                        button.textContent = game.getActivePlayer().symbol;
                        button.classList.add("clicked");
                        game.playRound(i, j);
                   }
                });
            }
        }
    }

    return {start};
}

const game = ScreenController();
game.start();

