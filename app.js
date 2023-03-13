// Module: make gameboard object
const gameBoard = (() => {
    let board = [
        '','','',
        '','','',
        '','',''
    ];
    const gameboard = document.querySelector('.gameboard');
    
    for (i = 0; i < board.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('id', i); //unique number for every cell
        gameboard.appendChild(cell);
        const cells = document.querySelectorAll('.cell');
        cell.addEventListener('click', (e) => {
            cell.style.pointerEvents = 'none';
            cell.classList.add(gameFlow.currentPlayer.marker);
            board[e.target.id] = gameFlow.currentPlayer.marker;
            cell.innerText = gameFlow.currentPlayer.marker;
            console.log(`${gameFlow.currentPlayer.name} selected cell ${e.target.id}`);
            console.log(board);
            gameFlow.nextPlayer();
            
        });
    }
    let cells = document.querySelectorAll('.cell');

    const clearBoard = () => {
        board = [
            '','','',
            '','','',
            '','',''
        ];
        cells.forEach((element) => {
            element.style.pointerEvents = 'auto';
            element.innerText = '';
            element.classList.remove('X', 'O');
        });  
    }
    
    return {board, gameboard, clearBoard};
})();

// Factory: Player objects constructor
const makePlayer = (name, marker) => {
    return {name, marker};
}

// Module: game flow
const gameFlow = (() => {
    const player1 = makePlayer('Player 1', 'X');
    const player2 = makePlayer('Player 2', 'O');
    let currentPlayer = player1;
    let isGameOver = false;
    let remainingCells = 9;

    const winningRows = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    function nextPlayer() {
        if (this.currentPlayer == player1) {
            this.currentPlayer = player2;
        } else {
            this.currentPlayer = player1;
        }
    };

    function resetGame() {
        this.isGameOver = false;
        this.currentPlayer = player1;
        this.remainingCells = 9;
        gameBoard.clearBoard();
    };

    return {currentPlayer, nextPlayer, resetGame};
})();

const reset = document.querySelector('.buttons');
reset.addEventListener('click', gameFlow.resetGame);