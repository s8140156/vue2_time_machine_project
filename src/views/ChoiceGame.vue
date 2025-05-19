<template>
  <div class="choice-game">
    <div class="overlay"></div>
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
      <button class="past-btn" @click="goToPast">🔙 回到過去</button>
      <button class="future-btn" @click="goToFuture">🔮 前往未來</button>
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
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  /* background: linear-gradient(to right, #0f2027, #203a43, #2c5364); */
  background: url("@/assets/time-machine.jpg") no-repeat center center/cover;
  color: #fff;
  /* z-index: 2; */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* 黑色半透明遮罩 */
  z-index: 1;
}

.top-right {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
}

.next-button {
  background-color: #FFD700;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
.next-button:hover {
  background-color: #e6c200;
  transform: scale(1.05);
}

.choice-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 40px;
  z-index:2;
}

button {
  padding: 16px 32px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  color: white;
  transition: 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.past-btn {
  background: #555;
}
.past-btn:hover {
  background: #333;
  transform: scale(1.05);
}

.future-btn {
  background: #0cf;
}
.future-btn:hover {
  background: #09a;
  transform: scale(1.05);
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

/* 📱RWD 手機調整 */
@media (max-width: 600px) {
  .choice-buttons {
    flex-direction: column;
  }
  
  button {
    width: 80%;
    font-size: 1rem;
  }

  .next-button {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>
