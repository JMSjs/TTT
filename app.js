const gameBoard = (() => {
    let board = ['','','','','','','','',''];
    const gameboard = document.querySelector('.gameboard');
    
    for (i = 0; i < board.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gameboard.appendChild(cell);
    }
})();