<template>
  <div class="final-ending-container">
    <h1>🎉 恭喜完成資訊時光之旅 🎉</h1>
    <p class="summary">
      希望這段穿梭過去與未來的旅程，帶給你滿滿的知識與回憶！  
      未來的世界正在等著我們一起探索！
      <br>
      謝謝大家!
    </p>

    <div class="action-buttons">
      <router-link to="/" class="restart-button">重新開始旅程 ⟳</router-link>
      <!-- <a href="https://chat.openai.com/" target="_blank" class="future-button">前往 AI 時代 ➜</a> -->
    </div>
  </div>
</template>

<style scoped>
.final-ending-container {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  color: #fff;
  min-height: 100vh;
}

h1 {
  font-size: 36px;
  margin-bottom: 30px;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.6);
}

.summary {
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 50px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.restart-button,
.future-button {
  display: inline-block;
  padding: 15px 35px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: transform 0.2s;
}

.restart-button {
  background: #0cf;
  color: #fff;
}

.future-button {
  background: #FFD700;
  color: #000;
}

.restart-button:hover,
.future-button:hover {
  transform: scale(1.1);
}
</style>
