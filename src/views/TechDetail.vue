<template>
  <div class="tech-detail-container">
    <h1>資訊時光機 技術報告</h1>
    <p class="intro">
      本專案使用 Vue 2 進行開發，透過簡單的互動遊戲介紹資訊時代的演進歷程。
    </p>

    <div class="tech-section">
      <h2>🛠 使用技術</h2>
      <ul>
        <li>Vue 2 + Vue Router</li>
        <li>CSS3 動畫 (Star Wars 字幕效果)</li>
        <li>Component 模組化開發</li>
        <li>Git 版本控制 & GitHub 上傳</li>
      </ul>
    </div>

    <div class="tech-section">
      <h2>🚀 心得 / 學習分享 </h2>
      <ul>
        <li>專案架構設計</li>
        <li>Vue2語法與應用</li>
        <li>翻牌、貪食蛇遊戲邏輯</li>
        <li>RWD響應式設計 ➡️ 痛苦</li>
        <li></li>
        <li>CSS元件化改善</li>
      </ul>
    </div>

    <router-link to="/final-ending" class="next-button">完成報告 ➜</router-link>
  </div>
</template>

<style scoped>
.tech-detail-container {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  color: #fff;
  min-height: 100vh;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.5);
}

.intro {
  font-size: 18px;
  margin-bottom: 30px;
}

.tech-section {
  margin-bottom: 40px;
}

.tech-section h2 {
  color: #FFD700;
  margin-bottom: 15px;
}

.tech-section ul {
  list-style: none;
  padding: 0;
}

.tech-section li {
  margin: 10px 0;
  font-size: 16px;
}

.next-button {
  display: inline-block;
  padding: 12px 30px;
  background: #0cf;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-size: 18px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: transform 0.2s;
}

.next-button:hover {
  transform: scale(1.05);
}
</style>
