const board = document.getElementById("board");
const ctx = board.getContext("2d");
const square = 20;

const snake = [
  { x: 100, y: 100 },
  { x: 80, y: 100 },
  { x: 60, y: 100 }
];

window.move = { x: square, y: 0 };

let food = {
  x: Math.floor(Math.random() * (board.width / square)) * square,
  y: Math.floor(Math.random() * (board.height / square)) * square
};

let score = 0;

function draw_rect(part) {
  ctx.fillStyle = "#7c9cff";
  ctx.strokeStyle = "#243b8a";
  ctx.fillRect(part.x,part.y,square,square);
  ctx.strokeRect(part.x,part.y,square,square);
}

// Draw the full snake
function draw_snake() {
  snake.forEach(draw_rect);
}
function draw_food() {
  ctx.fillStyle = "#22d3ee";
  ctx.fillRect(food.x, food.y, square, square);
}

function draw_score() {
  const el = document.getElementById("score");
  if (el) el.textContent = "Score: " + score;
}

function clear_canvas() {
  ctx.fillStyle = "#0b1020";
  ctx.strokeStyle = "#1e2a5a";
  ctx.fillRect(0, 0, board.width, board.height);
  ctx.strokeRect(0, 0, board.width, board.height);
}

function moveSnake() {
  const head = { x: snake[0].x + window.move.x, y: snake[0].y + window.move.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 1;
    draw_score();
    food = {
      x: Math.floor(Math.random() * (board.width / square)) * square,
      y: Math.floor(Math.random() * (board.height / square)) * square
    };
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = window.snake[0];

  // 🐛 BUG: Incomplete wall collision
  if (
    head.x<0||head.x>=window.board.width || 
    head.y<0||head.y>=window.board.height
  ) {
    window.gameOver = true;
  }

  // 🐛 BUG: Wrong self-collision logic(window.snake is user for testing purpose)
  for (let i = 1; i < window.snake.length; i++) {
    if (window.snake[i].x === head.x && window.snake[i].y==head.y) {
      window.gameOver = true;
    }
  }
}

// Show Game Over Text
function showGameOver() {
  if (!ctx) return;
  ctx.fillStyle = "#ffffff";
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", board.width / 2, board.height / 2);
}
document.addEventListener("keydown", registerMove);

function registerMove(e) {
  const curr = window.move;
  if (e.key === "ArrowUp" && curr.y === 0) window.move = { x: 0, y: -square };
  if (e.key === "ArrowDown" && curr.y === 0) window.move = { x: 0, y: square };
  if (e.key === "ArrowLeft" && curr.x === 0) window.move = { x: -square, y: 0 };
  if (e.key === "ArrowRight" && curr.x === 0) window.move = { x: square, y: 0 };
}

window.gameOver = false;

function main() {
  if (window.gameOver){
    showGameOver();
    document.removeEventListener("keydown",registerMove);
    // Offer a new game automatically
    setTimeout(function(){
      if (typeof window.resetGame === 'function'){
        var wantsNew = true;
        try { wantsNew = window.confirm("Game Over. Start a new game?"); } catch(_) {}
        if (wantsNew) { window.resetGame(); }
      }
    }, 400);
    return;
  }
  setTimeout(() => {
    clear_canvas();
    moveSnake();
    checkCollision(); 
    draw_snake();
    draw_food();
    main();
  }, Math.max(70, 180 - score*5));
}

// Expose for testing
window.snake = snake;
window.moveSnake = moveSnake;
window.clear_canvas = clear_canvas;
window.registerMove = registerMove;
window.checkCollision = checkCollision;
window.board = board;
window.ctx = ctx;
window.main = main;
window.move = window.move;
window.food = food;
window.score = score;

// Allow restarting the game
window.resetGame = function resetGame(){
  // reset snake to initial 3 segments
  snake.splice(0, snake.length,
    { x: 100, y: 100 },
    { x: 80, y: 100 },
    { x: 60, y: 100 }
  );
  // reset direction, food, score, flags
  window.move = { x: square, y: 0 };
  food = {
    x: Math.floor(Math.random() * (board.width / square)) * square,
    y: Math.floor(Math.random() * (board.height / square)) * square
  };
  score = 0;
  window.gameOver = false;
  draw_score();
  // rebind controls and restart loop
  document.removeEventListener("keydown", registerMove);
  document.addEventListener("keydown", registerMove);
  clear_canvas();
  main();
}

draw_score();
document.addEventListener("keydown",registerMove);
main();
       