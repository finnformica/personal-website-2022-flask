const boardBorder = "white";
const boardBackground = "#2E18E1";
const snakeCol = "white";
const snakeBorder = "black";

const snakeboard = document.getElementById("gameCanvas");
const snakeboard_ctx = gameCanvas.getContext("2d");

const blockSize = 15;
const delay = 80; // timout between frames; determines speed of game

let dx = blockSize; // starting x and y velocities
let dy = 0;

let changingDirection = false;

var food_x;
var food_y;

var score = 0;

var gameStarted = false;

let snake = [
  {x: 5 * blockSize, y: blockSize},
  {x: 4 * blockSize, y: blockSize},
  {x: 3 * blockSize, y: blockSize},
  {x: 2 * blockSize, y: blockSize},
  {x: 1 * blockSize, y: blockSize}
];

document.addEventListener("keydown", () => {
  event.preventDefault(); // stop arrow keys from scrolling web page
  if (gameStarted) changeDirection(event.key);
})

clearCanvas();
generateFood();
drawFood();
drawSnake();

const button = document.getElementById("gameBegin");

button.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    main();
  }
})


function main() {

  if (detectCollision() && gameStarted) {
    window.location.reload(false);
  }

  changingDirection = false;
  setTimeout(function onTick() {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();

    // call main recursively to create game loop
    main();
  }, delay)
}

function drawSnakePart(snakePart) {
  snakeboard_ctx.fillStyle = snakeCol;
  snakeboard_ctx.strokeStyle = snakeBorder;
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, blockSize, blockSize);
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, blockSize, blockSize);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function clearCanvas() {
  snakeboard_ctx.fillStyle = boardBackground;
  snakeboard_ctx.strokestyle = boardBorder;
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy}
  snake.unshift(head);

  const hasEaten = snake[0].x === food_x && snake[0].y === food_y;

  if (hasEaten) {
    score += 1;
    document.getElementById("score").innerHTML = "Score: " + score;
    generateFood();
  } else snake.pop();
}

function changeDirection(key) {

  if(changingDirection) return;
   changingDirection = true;

  if ((key === "a" || key === "ArrowLeft") && (dx !== blockSize)) {
    dx = -blockSize;
    dy = 0;
  }
  if ((key === "w" || key === "ArrowUp") && (dy !== blockSize)) {
    dx = 0;
    dy = -blockSize;
  }
  if ((key === "d" || key === "ArrowRight") && (dx !== -blockSize)) {
    dx = blockSize;
    dy = 0;
  }
  if ((key === "s" || key === "ArrowDown") && (dy !== -blockSize)) {
    dx = 0;
    dy = blockSize;
  }
}


function detectCollision() {
  for (var i = 4; i < snake.length; i++) {
    collision = (snake[i].x === snake[0].x) && (snake[i].y === snake[0].y);

    if (collision) return true;
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeboard.width - blockSize;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeboard.height - blockSize;

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}

function randomFood(max, min) {
  return Math.round((Math.random() * (max - min) + min) / blockSize) * blockSize;
}

function generateFood() {
  food_x = randomFood(2 * blockSize, snakeboard.width - 2 * blockSize);
  food_y = randomFood(2 * blockSize, snakeboard.height - 2 * blockSize);
  snake.forEach(function (part) {
    if (part.x == food_x && part.y == food_y) generateFood();
  });
}

function drawFood() {
  snakeboard_ctx.fillStyle = "red";
  snakeboard_ctx.strokestyle = "darkred";
  snakeboard_ctx.fillRect(food_x, food_y, blockSize, blockSize);
  snakeboard_ctx.strokeRect(food_x, food_y, blockSize, blockSize);
}
