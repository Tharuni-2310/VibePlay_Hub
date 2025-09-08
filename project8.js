const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game objects (exposed for testing)
window.bird = {
  x: 50,
  y: 150,
  width: 30,
  height: 30,
  color: "gold",
  gravity: 0.1,
  velocity: 0
};

window.pipes = [];
window.score = 0;
window.gameOver = false;

// Constants
const PIPE_GAP = 160;
const PIPE_SPACING = 300;

// Expose functions for testing
window.updateBird = function() {
  this.bird.velocity += this.bird.gravity;
  this.bird.y += this.bird.velocity;

  if (this.bird.y + this.bird.height > canvas.height || this.bird.y < 0) {
    this.gameOver = true;
  }
};

window.updatePipes = function() {
  // Move pipes
  this.pipes.forEach(pipe => {
    pipe.x -= 2;

    // Score counting
    if (!pipe.passed && pipe.x + pipe.width < this.bird.x) {
      pipe.passed = true;
      this.score++;
      document.getElementById("score").textContent = this.score;
    }

    // Collision detection
    if (this.bird.x < pipe.x + pipe.width &&
        this.bird.x + this.bird.width > pipe.x &&
        (this.bird.y < pipe.topHeight || 
         this.bird.y + this.bird.height > pipe.bottomY)) {
      this.gameOver = true;
    }
  });

  // Generate new pipes
  if (this.pipes.length === 0 || 
      this.pipes[this.pipes.length-1].x < canvas.width - PIPE_SPACING) {
    const topHeight = Math.random() * (canvas.height - PIPE_GAP - 100) + 50;
    this.pipes.push({
      x: canvas.width,
      width: 50,
      topHeight: topHeight,
      bottomY: topHeight + PIPE_GAP,
      passed: false
    });
  }

  // Remove off-screen pipes
  if (this.pipes[0] && this.pipes[0].x + this.pipes[0].width < 0) {
    this.pipes.shift();
  }
};

window.jump = function() {
  this.bird.velocity = -3;
};

window.resetGame = function() {
  this.bird.y = 150;
  this.bird.velocity = 0;
  this.pipes = [];
  this.score = 0;
  document.getElementById("score").textContent = "0";
  this.gameOver = false;
};

// Input handling
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (this.gameOver) {
      this.resetGame();
    } else {
      this.jump();
    }
  }
});

// Game loop
function gameLoop() {
  if (this.gameOver) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width/2 - 80, canvas.height/2);
    ctx.font = "18px Arial";
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  this.updateBird();
  this.updatePipes();
  
  // Drawing
  ctx.fillStyle = "green";
  this.pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
    ctx.fillRect(pipe.x, pipe.bottomY, pipe.width, canvas.height - pipe.bottomY);
  });
  
  ctx.fillStyle = this.bird.color;
  ctx.fillRect(this.bird.x, this.bird.y, this.bird.width, this.bird.height);
  
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText(`Score: ${this.score}`, 20, 30);
  
  requestAnimationFrame(gameLoop.bind(this));
}

// Start game
gameLoop.call(window);