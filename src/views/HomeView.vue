<template>
  <div class="home-container">
    <div class="overlay"></div><!-- 半透明遮罩提升可讀性 -->
    <div class="star-wars-text">
      <h1>資訊時光機</h1>
      <p>歡迎進入資訊時光機...</p>
      <p>請準備好，展開一場穿梭過去與未來的冒險！</p>
    </div>
    <router-link to="/card" class="next-button">開始旅程 ➜</router-link>
  </div>
</template>

<script></script>

<style scoped>
.home-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url("@/assets/time-tunnel.jpeg") no-repeat center center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 半透明遮罩 */
  z-index: 1;
}

.star-wars-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0) rotateX(20deg);
  font-family: "Orbitron", "Noto Sans TC", "微軟正黑體", sans-serif; /* 酷炫未來感字體 */
  text-align: center;
  width: 80%;
  color: #ffd700; /* 鮮亮的金黃色 */
  animation: crawl 15s linear forwards;
}

.star-wars-text h1 {
  font-size: 58px;
  font-weight: bold;
  letter-spacing: 2px; /* 字距拉大更有氣勢 */
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7); /* X偏移, Y偏移, 模糊半徑, 顏色 */
}

.star-wars-text p {
  font-size: 30px;
  margin-top: 16px;
  line-height: 1.6;
  color: #ffff99; /* 比標題稍微柔和的亮黃 */
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
}

@keyframes crawl {
  0% {
    transform: translate(-50%, 0) rotateX(20deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -1000px) rotateX(25deg) scale(0.5);
    opacity: 0;
  }
}

.next-button {
  position: absolute; /* 保持 absolute 才能相對於父層 home-container 定位 */
  z-index: 10;
  bottom: 70px; /* 距離底部 70px */
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background: #0cf;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-size: 22px;
}
</style>
