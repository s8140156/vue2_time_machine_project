<template>
  <div class="choice-game">
    <div class="top-right">
      <router-link to="/tech-intro" class="next-button">下一頁 ➜</router-link>
    </div>

    <h1 class="fade-in">資訊時光機：終章抉擇</h1>

    <p class="intro fade-in-delayed">
      你穿越了一連串的資訊年代，看見科技如何影響世界。
      <br />但現在，時光機即將關閉……
      <br />你，會選擇哪個方向前進？
    </p>

    <div class="choice-buttons fade-in-delayed-more">
      <button @click="goToPast">🔙 回到過去</button>
      <button @click="goToFuture">🔮 前往未來</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChoiceGame',
  methods: {
    goToPast() {
      this.$router.push('/past-ending');
    },
    goToFuture() {
      this.$router.push('/future-ending');
    }
  }
};
</script>

<style scoped>
.choice-game {
  text-align: center;
  padding: 40px;
}

.top-right {
  position: absolute;
  top: 20px;
  right: 20px;
}

.next-button {
  background-color: #4CAF50;
  color: white;
  padding: 6px 12px;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
}
.next-button:hover {
  background-color: #45a049;
}

.choice-buttons {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
}

button {
  padding: 16px 24px;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background: #222;
  color: white;
  transition: 0.3s;
}
button:hover {
  background: #444;
}

/* ✨動畫效果 */
.fade-in {
  opacity: 0;
  animation: fadeIn 1s ease forwards;
}

.fade-in-delayed {
  opacity: 0;
  animation: fadeIn 1s ease 0.5s forwards;
}

.fade-in-delayed-more {
  opacity: 0;
  animation: fadeIn 1s ease 1s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>
