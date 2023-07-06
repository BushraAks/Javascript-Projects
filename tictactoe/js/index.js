const cells = document.querySelectorAll('.cell'),
      resetBtn = document.querySelector('#reset-button'),
      winnerMsg = document.querySelector('.winner'),
      statusTxt = document.querySelector('.status-text');
      winIndexes = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]
      ];

let currentPlayer = 'X';
let winner;
let start = true;

if (start){
    startGame();
}

resetBtn.addEventListener('click', resetGame);

function startGame() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (currentPlayer == 'X'){cell.classList.add('green-color')}
            else {cell.classList.add('blue-color')}
            drawCharacter(cell, index);
            statusTxt.innerText = `Player ${currentPlayer}'s Turn`;

            if (checkWinner()) {
                endGame();
                if (winner == 'X') {winnerMsg.classList.add('green-color')}
                else {winnerMsg.classList.add('blue-color')}
                winnerMsg.innerText = `Player ${winner} wins!`;
                setTimeout(() => {winnerMsg.style.display = 'block';}, 200);
                
            }

            else if(checkDraw()){
                winnerMsg.innerText = `it's a Draw!`;
                setTimeout(() => {winnerMsg.style.display = 'block';}, 200);
                endGame();
            }
        })
    })
}

function endGame() {
    start = false;
}

function drawCharacter(cell, index) {
    if( cell.innerText == '' && start){
        cell.innerText = currentPlayer;
        currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    }
}

function checkWinner(){
    winIndexes.forEach((indexes) => {
        if (cells[indexes[0]].innerText == '' || cells[indexes[1]].innerText == '' ||cells[indexes[2]].innerText == ''){
            return;
        }
        else if (cells[indexes[0]].innerText == cells[indexes[1]].innerText &&  cells[indexes[1]].innerText == cells[indexes[2]].innerText){
            winner = currentPlayer == 'X'? 'O': 'X';
        }
    })
    if(winner){
        return true;
    }
    else return;
}

function checkDraw(){
    draw = true;
    winIndexes.forEach((indexes) => {
        indexes.forEach((index) => {
            if (cells[index].innerText == ''){
                 draw = false;
                }
        })
    })

    return draw
}

function resetGame() {
    cells.forEach((cell) => {cell.innerText = '';});
    currentPlayer = 'X';
    winner = '';
    start = true;
    winnerMsg.style.display = 'none';
    winnerMsg.classList.remove('green-color');
    winnerMsg.classList.remove('blue-color');
    cells.forEach((cell) => {
        cell.classList.remove('green-color');
        cell.classList.remove('blue-color');
    })
}