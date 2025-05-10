<template>
  <div class="tech-container">
    <h1>技術報告 - 專案簡介</h1>
    <p>
      本專案以「資訊時光機」為主題，結合 Vue 2、Vue Router 及 CSS 動畫設計，
      打造出一個充滿互動性的網頁遊戲體驗。
    </p>
    <p>
      透過翻牌遊戲認識早期資訊科技產品、問答挑戰現代資訊發展，並在抉擇中體驗未來的可能性。
    </p>
    <router-link to="/tech-detail" class="next-button">下一頁 ➜</router-link>
  </div>
</template>

<script>
export default {
  name: 'TechIntro'
}
</script>

<style scoped>
.tech-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 50px;
  height: 100vh;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  color: #fff;
  animation: fadeIn 1s ease;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
  color: #FFD700;
}

p {
  font-size: 20px;
  line-height: 1.6;
  max-width: 600px;
  margin-bottom: 20px;
}

.next-button {
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #0cf;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-size: 18px;
  transition: background 0.3s;
}

.next-button:hover {
  background-color: #09a;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
