<template>
  <div class="past-game-container">
    <div class="top-right">
      <router-link to="/choice" class="next-button">重新抉擇 ➜</router-link>
    </div>
    <h1>🐍 經典貪食蛇遊戲 🐍</h1>
    <canvas ref="gameCanvas" width="400" height="400"></canvas>
    <div v-if="isMobile" class="mobile-controls">
      <div class="control-row">
        <button @click="setDirection(0, -1)">⬆️</button>
      </div>
      <div class="control-row">
        <button @click="setDirection(-1, 0)">⬅️</button>
        <button></button>
        <button @click="setDirection(1, 0)">➡️</button>
      </div>
      <div class="control-row">
        <button @click="setDirection(0, 1)">⬇️</button>
      </div>
    </div>

    <p class="ending-text" v-if="gameOver">
      這就是屬於經典時代的娛樂，希望你也曾體驗過這份單純的快樂！
    </p>

    <div v-if="gameOver">
      <button @click="restartGame" class="restart-button">再玩一次</button>
      <router-link to="/tech-intro" class="next-button">下一頁 ➜</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "PastEnding",
  data() {
    return {
      ctx: null,
      snake: [{ x: 10, y: 10 }],
      food: { x: 5, y: 5 },
      direction: { x: 1, y: 0 }, //先向右移動
      gridSize: 20,
      tileCount: 20,
      gameLoop: null,
      gameOver: false,
      isMobile: true,
    };
  },
  mounted() {
    this.ctx = this.$refs.gameCanvas.getContext("2d");
    window.addEventListener("keydown", this.changeDirection);
    this.drawGame(); // 一開始只畫場景，不動

    this.ctx = this.$refs.gameCanvas.getContext("2d");
    window.addEventListener("keydown", this.changeDirection);

    // 判斷是否是手機裝置
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      this.isMobile = true;
    }

    this.startGame();
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.changeDirection);
    clearInterval(this.gameLoop);
  },
  methods: {
    startGame() {
      if (!this.gameLoop) {
        this.gameLoop = setInterval(this.gameTick, 300);
      }
    },
    restartGame() {
      this.snake = [{ x: 10, y: 10 }];
      this.food = { x: 5, y: 5 };
      this.direction = null;
      this.gameOver = false;
      clearInterval(this.gameLoop);
      this.gameLoop = null;
      this.drawGame();
    },
    gameTick() {
      if (!this.direction) return; // 沒方向不動

      const head = { ...this.snake[0] };
      head.x += this.direction.x;
      head.y += this.direction.y;

      if (this.checkCollision(head)) {
        clearInterval(this.gameLoop);
        this.gameOver = true;
        return;
      }

      this.snake.unshift(head);

      if (head.x === this.food.x && head.y === this.food.y) {
        this.placeFood();
      } else {
        this.snake.pop();
      }

      this.drawGame();
    },
    checkCollision(head) {
      return (
        head.x < 0 ||
        head.x >= this.tileCount ||
        head.y < 0 ||
        head.y >= this.tileCount ||
        this.snake.some((segment) => segment.x === head.x && segment.y === head.y)
      );
    },
    placeFood() {
      this.food = {
        x: Math.floor(Math.random() * this.tileCount),
        y: Math.floor(Math.random() * this.tileCount),
      };
    },
    changeDirection(e) {
      const keyMap = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };
      const newDir = keyMap[e.key];
      if (newDir) {
        if (!this.direction) this.startGame(); // 第一次按方向鍵才開始動
        if (
          this.direction === null ||
          this.direction.x + newDir.x !== 0 ||
          this.direction.y + newDir.y !== 0
        ) {
          this.direction = newDir;
        }
      }
    },
    drawGame() {
      this.ctx.fillStyle = "#000";
      this.ctx.fillRect(0, 0, 400, 400);

      // 畫蛇
      this.ctx.fillStyle = "#0cf";
      this.snake.forEach((segment) => {
        this.ctx.fillRect(
          segment.x * this.gridSize,
          segment.y * this.gridSize,
          this.gridSize,
          this.gridSize
        );
      });

      // 畫食物
      this.ctx.fillStyle = "#FFD700";
      this.ctx.fillRect(
        this.food.x * this.gridSize,
        this.food.y * this.gridSize,
        this.gridSize,
        this.gridSize
      );
    },
    setDirection(x, y) {
      if (!this.direction) this.startGame();
      if (!this.direction || this.direction.x + x !== 0 || this.direction.y + y !== 0) {
        this.direction = { x, y };
      }
    },
  },
};
</script>

<style scoped>
.past-game-container {
  text-align: center;
  padding: 30px;
  background: linear-gradient(to right, #141e30, #243b55);
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

canvas {
  background: #000;
  border: 2px solid #fff;
  margin-bottom: 20px;
}

.ending-text {
  font-size: 18px;
  margin: 20px 0;
}

.restart-button,
.next-button {
  display: inline-block;
  padding: 10px 20px;
  background: #0cf;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  margin: 10px;
  font-size: 16px;
  cursor: pointer;
}

.next-button {
  background: #ffd700;
  color: #000;
}

.restart-button:hover,
.next-button:hover {
  transform: scale(1.05);
}
.mobile-controls {
  margin-top: 30px;
}

.control-row {
  display: flex;
  justify-content: center;
  margin: 5px 0;
}

.mobile-controls button {
  width: 60px;
  height: 60px;
  font-size: 30px;
  margin: 5px;
  border-radius: 10px;
  border: none;
  background: #0cf;
  color: #fff;
  cursor: pointer;
}

.mobile-controls button:active {
  background: #09a;
}
.top-right {
  position: absolute;
  top: 20px;
  right: 20px;
}

.next-button {
  background-color: #4caf50;
  color: white;
  padding: 6px 12px;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
}
.next-button:hover {
  background-color: #45a049;
}
</style>
