<template>
  <div class="past-game-container">
    <div class="top-right">
      <router-link to="/choice" class="next-button">重新抉擇 ➜</router-link>
    </div>

    <h1>🐍 經典貪食蛇遊戲 🐍</h1>

    <canvas ref="gameCanvas"></canvas>

    <!-- 📱 手機方向鍵控制區 -->
    <div v-if="isMobile" class="mobile-dpad">
      <div class="row up">
        <button @click="setDirection(0, -1)">⬆️</button>
      </div>
      <div class="row down">
        <button @click="setDirection(-1, 0)">⬅️</button>
        <button @click="setDirection(0, 1)">⬇️</button>
        <button @click="setDirection(1, 0)">➡️</button>
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
    ctx: null, // canvas 的繪圖上下文 (2D)
    snake: [{ x: 10, y: 10 }], // 初始蛇的身體，第一個位置
    food: { x: 5, y: 5 }, // 初始食物位置
    direction: { x: 1, y: 0 }, // 初始方向（向右）
    gridSize: 20, // 每個格子尺寸為 20px
    tileCount: 20, // 棋盤一列/欄最多有幾格
    gameLoop: null, // 遊戲計時器
    gameOver: false, // 是否結束
    isMobile: true, // 是否為手機裝置
    };
  },
  mounted() {
    // 取得 canvas 的 2D 繪圖上下文（之後才能畫圖）
    this.ctx = this.$refs.gameCanvas.getContext("2d");

    // RWD canvas 尺寸自動適應
    // 設定 canvas 的寬高，最大為 400px，否則依螢幕寬度自適應（保留 10% 邊界）
    const canvas = this.$refs.gameCanvas;
    const size = Math.min(window.innerWidth * 0.9, 400); // 手機畫面寬度的 90%，最多 400px

    // 設定畫布的實際尺寸（JS層級）
    canvas.width = canvas.height = size;

    // 重新設定 gridSize, tileCount 的單位比例
    this.gridSize = size / this.tileCount;

    this.ctx = canvas.getContext("2d");

    // 監聽鍵盤按鍵控制方向
    window.addEventListener("keydown", this.changeDirection);

    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      this.isMobile = true;
    }

    this.startGame();
  },
  beforeDestroy() { // 組件銷毀前清理事件與資源
    window.removeEventListener("keydown", this.changeDirection);
    clearInterval(this.gameLoop);
  },
  methods: {
    startGame() {
      // 每 300ms 執行一次 gameTick() 更新邏輯
      if (!this.gameLoop) {
        this.gameLoop = setInterval(this.gameTick, 200); // 控制貪食蛇速度
      }
    },
    restartGame() {
      // 初始化資料，停止現有循環，重新畫畫面
      this.snake = [{ x: 10, y: 10 }];
      this.food = { x: 5, y: 5 };
      this.direction = null;
      this.gameOver = false;
      clearInterval(this.gameLoop);
      this.gameLoop = null;
      this.drawGame();
    },
    gameTick() { //  每回合更新邏輯 控制遊戲每幀的邏輯
      if (!this.direction) return; // 沒方向就不動

      // 蛇往目前方向移動一格
      const head = { ...this.snake[0] };
      head.x += this.direction.x;
      head.y += this.direction.y;

      // 如果撞牆或撞到自己，結束遊戲
      if (this.checkCollision(head)) {
        clearInterval(this.gameLoop);
        this.gameOver = true;
        return;
      }

      // 把新頭加進蛇身前端
      this.snake.unshift(head);

      if (head.x === this.food.x && head.y === this.food.y) {
        this.placeFood(); // 吃到食物
      } else {
        this.snake.pop(); // 沒吃到就把尾巴去掉
      }

      this.drawGame(); // 更新畫面
    },
    checkCollision(head) { //  判斷是否撞牆或撞自己 撞牆/吃東西邏輯
      return (
        head.x < 0 ||
        head.x >= this.tileCount ||
        head.y < 0 ||
        head.y >= this.tileCount ||
        this.snake.some((s) => s.x === head.x && s.y === head.y)
      );
    },
    placeFood() { // 隨機產生新的食物位置 撞牆/吃東西邏輯
      this.food = {
        x: Math.floor(Math.random() * this.tileCount),
        y: Math.floor(Math.random() * this.tileCount),
      };
    },
    changeDirection(e) { // 鍵盤控制
      // 依按鍵決定方向
      const keyMap = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };
      const newDir = keyMap[e.key];
      if (newDir) {
        if (!this.direction) this.startGame();
        //  避免蛇直接掉頭
        if (
          this.direction === null ||
          this.direction.x + newDir.x !== 0 ||
          this.direction.y + newDir.y !== 0
        ) {
          this.direction = newDir;
        }
      }
    },
    setDirection(x, y) { // 手機按鈕控制 與changeDirection() 功能類似，但從手機 button 傳入方向
      if (!this.direction) this.startGame();
      if (!this.direction || this.direction.x + x !== 0 || this.direction.y + y !== 0) {
        this.direction = { x, y };
      }
    },
    drawGame() { //畫畫面 清空背景（黑色）實際畫面更新
      this.ctx.fillStyle = "#000";
      this.ctx.fillRect(0, 0, 400, 400);

      // 畫蛇  畫出每一格蛇身
      this.ctx.fillStyle = "#0cf";
      this.snake.forEach((segment) => {
        this.ctx.fillRect( // 每一段蛇身剛好佔滿整個格子，因此看起來會是一體成形的「連續方塊」，如果速度快一點會比較有「流暢感」。
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
  },
};
</script>

<style scoped>
.past-game-container {
  position: relative;
  min-height: 100vh;
  background: #000;
  color: #fff;
  text-align: center;
  padding: 30px;
  font-family: "Courier New", monospace;
  animation: crt-flicker 1.5s infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.past-game-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0.03) 2px,
    transparent 2px,
    transparent 4px
  );
  pointer-events: none;
  z-index: 1;
}

@keyframes crt-flicker {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.98;
  }
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  z-index: 2;
  position: relative;
}

canvas {
  background: #000;
  border: 2px solid #fff;
  margin-bottom: 20px;
  z-index: 2;
  position: relative;
  /* width: 90vw;
  height: 90vw; */
  /* max-width: 400px;
  max-height: 400px; */
  max-width: 100%;
  height: auto;
}

.ending-text {
  font-size: 18px;
  margin: 20px 0;
  z-index: 2;
  position: relative;
}
.top-right {
  position: absolute;
  top: 20px;
  right: 20px;
}

.next-button,
.restart-button {
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  margin: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  z-index: 2;
  position: relative;
}
.next-button:hover,
.restart-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

/* 🔼 手機方向鍵控制區 */
.mobile-dpad {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  z-index: 2;
}

.mobile-dpad .row {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 5px 0;
}

.mobile-dpad button {
  width: 60px;
  height: 60px;
  font-size: 30px;
  background-color: #888;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.mobile-dpad button:active {
  background: #09a;
}

</style>
