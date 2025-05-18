<template>
  <div class="future-ending-container">
    <div class="top-right">
      <router-link to="/choice" class="top-right-button">重新抉擇 ➜</router-link>
    </div>
    <canvas ref="starCanvas" class="star-canvas"></canvas>
    <h1 class="title">🚀 歡迎來到未來世界 🚀</h1>
    <p class="intro">
      在這個充滿人工智慧與無限可能的時代，<br />
      資訊早已不是過去那樣緩慢累積，而是透過 AI 即時產生。<br />
      <br />
      未來，已經在你眼前展開 —— 你，準備好了嗎？
    </p>
    <a href="https://chat.openai.com/" target="_blank" class="future-button"
      >前往 AI 時代 ➜</a
    >
    <router-link to="/tech-intro" class="next-button">下一頁</router-link>
  </div>
</template>

<script>
export default {
  name: "FutureEnding",
  mounted() {
    this.initStars();
  },
  methods: {
    initStars() {
      const canvas = this.$refs.starCanvas;
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const stars = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
      }));

      function animate() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach((star) => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
          star.y -= star.speed;
          if (star.y < 0) {
            star.y = canvas.height;
            star.x = Math.random() * canvas.width;
          }
        });

        requestAnimationFrame(animate);
      }

      animate();

      window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    },
  },
};
</script>

<style scoped>
.future-ending-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  color: #fff;
  padding: 40px;
  animation: fadeIn 1s ease-in-out;
  overflow: hidden;
}

.star-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.title {
  font-size: 36px;
  margin-bottom: 30px;
  color: #ffd700;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.intro {
  font-size: 20px;
  line-height: 1.6;
  max-width: 600px;
  margin-bottom: 50px;
  z-index: 1;
}

.future-button,
.next-button {
  display: inline-block;
  padding: 15px 35px;
  border-radius: 8px;
  text-decoration: none;
  margin: 15px;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.3s, background 0.3s;
  z-index: 1;
}

.future-button {
  background: #0cf;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.future-button:hover {
  transform: scale(1.1);
  background: #09a;
}

/* 下一頁按鈕 */
.next-button {
  display: inline-block;
  padding: 15px 35px;
  border-radius: 8px;
  text-decoration: none;
  margin: 15px;
  font-size: 18px;
  cursor: pointer;
  background: #ffd700;
  color: #000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, background 0.3s;
  z-index: 1;
}

.next-button:hover {
  background: #e6c200;
  transform: scale(1.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* 上方重新抉擇按鈕 */
.top-right {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
}

.top-right-button {
  background-color: #4caf50;
  color: white;
  padding: 6px 12px;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
  transition: transform 0.3s, background 0.3s;
}

.top-right-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}
</style>
