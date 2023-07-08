const gameBoard = document.querySelector('#game-canvas');
const context = gameBoard.getContext('2d');
const scoreTxt = document.querySelector('.score');
const restartBtn = document.querySelector('#restart-btn');


const gameWidth = gameBoard.width;
const gameHeight  = gameBoard.height;
const unit = 20;
let boardColor = 'antiquewhite';
let snakeColor = '#004e00';
let foodColor = '#c60000';
let running = false;
let score = 0;
let xVelocity = unit; 
let yVelocity = 0;
let foodX;
let foodY;
let snake = [
    {x: unit * 4, y: 0},
    {x: unit * 3, y: 0},
    {x: unit * 2, y: 0},
    {x: unit * 1, y: 0},
    {x: 0, y: 0}
]

window.addEventListener('keydown', changeDirection);
window.addEventListener('keydown', (event) => {
    if (event.keyCode == 32){
        restartGame();
    }
})
restartBtn.addEventListener('click', restartGame);

gameStart();

function gameStart() {
    running = true;
    scoreTxt.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function drawSnake() {
    context.fillStyle = snakeColor;
    context.strokeStyle = 'black';
    snake.forEach((part) => {
        context.fillRect(part.x, part.y, unit, unit);
        context.strokeRect(part.x, part.y, unit, unit);
    })
};
function moveSnake() {
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity}

    snake.unshift(head);

    if (snake[0].x == foodX && snake[0].y == foodY){
        score += 1;
        scoreTxt.textContent = score;
        createFood();
    }
    else {snake.pop()}
};
function createFood() {
    // generates random coordinates for our food within the scope of the game board
    foodX = Math.round(Math.random() * (gameWidth - unit) / unit) * unit;
    foodY = Math.round(Math.random() * (gameWidth - unit) / unit) * unit;
};
function drawFood() {
    context.fillStyle = foodColor;
    context.fillRect(foodX, foodY, unit, unit);
};
function clearBoard() {
    context.fillStyle = boardColor;
    context.fillRect(0, 0, gameWidth, gameHeight);
}
function checkGameover() {
    if(snake[0].x < 0 || snake[0].x  > gameWidth - unit || snake[0].y < 0 || snake[0].y > gameHeight - unit){
        running = false;
    }
    for(let i = 1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            running = false;
        } 
    }
};
function displayGameover() {
    context.font = '50px MV Boli';
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.fillText('GAME OVER!', gameWidth / 2, gameHeight / 2);
    running = false;
};
function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT = 37,
          UP = 38,
          RIGHT = 39,
          DOWN = 40;

    const goingUp = (yVelocity == -unit);
    const goingLeft = (xVelocity == -unit);
    const goingRight = (xVelocity == unit);
    const goingDown = (yVelocity == unit);

    switch (true){
        case (keyPressed == UP && !goingDown): 
            xVelocity = 0;  
            yVelocity = -unit;
            break;
        case (keyPressed == DOWN && !goingUp) : 
            xVelocity = 0;
            yVelocity = unit;
            break;
        case (keyPressed == RIGHT && !goingLeft) : 
            xVelocity = unit;
            yVelocity = 0;
            break;
        case (keyPressed == LEFT && !goingRight) : 
            xVelocity = -unit;
            yVelocity = 0;
            break;
    }
};
function restartGame() {
    clearBoard();
    score = 0;
    snake = [
        {x: unit * 4, y: 0},
        {x: unit * 3, y: 0},
        {x: unit * 2, y: 0},
        {x: unit * 1, y: 0},
        {x: 0, y: 0}
    ] 
    xVelocity = unit;
    yVelocity = 0;
    gameStart();
};
function nextTick() {
    if (running){
        setTimeout(() => {
             clearBoard();
             drawFood();
             drawSnake();
             moveSnake();
             checkGameover();
             nextTick();
        }, 75);
    }
    else {displayGameover()};
};