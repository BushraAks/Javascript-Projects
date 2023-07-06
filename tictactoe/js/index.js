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
            drawCharacter(cell, index);
            statusTxt.innerText = `Player ${currentPlayer}'s Turn`;

            if (checkWinner()) {
                endGame();
                winnerMsg.innerText = `Player ${winner} wins!`;
                winnerMsg.style.display = 'block';
            }

            else if(checkDraw()){
                winnerMsg.innerText = `it's a Draw!`;
                winnerMsg.style.display = 'block';
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
}