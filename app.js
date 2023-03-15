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

        const img1 = document.createElement('img');
        img1.classList.add('hidden', 'rat1');
        img1.setAttribute('src', "https://i.imgur.com/3cQkxGR.jpg");
        cell.appendChild(img1);  
        
        const img2 = document.createElement('img');
        img2.classList.add('hidden', 'rat2');
        img2.setAttribute('src', "https://i.imgur.com/bUy4F1B.jpg");
        cell.appendChild(img2);
        
        const cells = document.querySelectorAll('.cell');
        cell.addEventListener('click', (e) => {
            cell.style.pointerEvents = 'none';
            cell.classList.add(gameFlow.currentPlayer.marker);
            board[e.target.id] = gameFlow.currentPlayer.marker;
            
            if (gameFlow.currentPlayer.marker === 'X') {
                img1.classList.add('show');
            } else {
                img2.classList.add('show');
            }
            // cell.innerText = gameFlow.currentPlayer.marker;
            console.log(`${gameFlow.currentPlayer.name} selected cell ${e.target.id}`);
            console.log(board);
            gameFlow.checkWinner();
            if (gameFlow.isGameOver) {
                document.querySelectorAll('.cell').forEach((element) => {
                    console.log(`cell ${element.id} is locked.`)
                    element.style.pointerEvents = 'none';
                });
            } else {
                gameFlow.nextPlayer();
                domFeatures.displayMessage(`${gameFlow.currentPlayer.name}'s turn.`);
            }
            
        });
    }

    let cells = document.querySelectorAll('.cell');
    let imgs = document.querySelectorAll('img');
    const clearBoard = () => {
        gameBoard.board = [
            '','','',
            '','','',
            '','',''
        ];
        cells.forEach((element) => {
            element.style.pointerEvents = 'auto';
            // element.innerText = '';
            element.classList.remove('X', 'O');
        }); 

        imgs.forEach((element) => {
            element.classList.remove('show');
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
    }

    function resetGame() {
        isGameOver = false;
        this.currentPlayer = player1;
        this.remainingCells = 9;
        domFeatures.displayMessage(`${this.currentPlayer.name}'s turn.`);
        gameBoard.clearBoard();
    }

    function checkWinner() {
        winningRows.forEach((element, index) => {
            if (gameBoard.board[element[0]] === this.currentPlayer.marker &&
                gameBoard.board[element[1]] === this.currentPlayer.marker &&
                gameBoard.board[element[2]] === this.currentPlayer.marker) {
                    domFeatures.displayMessage(`${this.currentPlayer.name} is the winner!`);
                    gameFlow.isGameOver = true;
            }
        })
    }

    return {currentPlayer, nextPlayer, resetGame, checkWinner, isGameOver};
})();

//Other DOM features
const domFeatures = (() => {
    const reset = document.querySelector('.buttons');
    reset.addEventListener('click', gameFlow.resetGame);
    
    const messages = document.querySelector('.messages');

    function displayMessage(string) {
        clearMessages();
        const message = document.createElement('p');
        message.innerText = string;
        messages.appendChild(message);
    }

    function clearMessages() {
        while (messages.firstChild) {
            messages.removeChild(messages.firstChild);
        } 
    }

    return {displayMessage};

})();