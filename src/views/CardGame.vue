<template>
  <div class="card-container">
    <div class="overlay"></div>
    <div class="card-game">
      <div class="top-right">
        <router-link to="/quiz" class="next-button">下一頁 ➜</router-link>
      </div>
      <h1>資訊時光機：翻牌遊戲</h1>
      <p>這是 1990 年代的某個熱門資訊產品，你能猜到是什麼嗎？</p>

      <!-- 卡片區 -->
      <div class="grid">
        <div
          class="card"
          v-for="(card, index) in cards"
          :key="index"
          @click="flipCard(index)"
        >
          <div class="card-content">
            <span v-if="card.flipped || card.matched">{{ card.emoji }}</span>
            <span v-else>❓</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 小知識 Modal -->
    <div v-if="currentDescription" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>📚 小知識</h3>
        <p>{{ currentDescription }}</p>
        <button @click="closeModal" class="close-button">關閉</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardGame",
  data() {
    // 卡片資料格式
    let emojis = [
      { emoji: "📟", description: "BB Call 是 1990 年代的傳呼機，曾風靡一時" },
      { emoji: "💾", description: "3.5 吋磁片，是早期的資料儲存裝置" },
      { emoji: "📱", description: "第一代智慧型手機出現在 2000 年代初期" },
      {
        emoji: "🖥️",
        description:
          "CRT 螢幕電腦：1980-90 年代常見的笨重顯示器，代表早期桌上型電腦的記憶。",
      },
      {
        emoji: "💻",
        description:
          "DOS 作業系統：磁碟作業系統，1980 年代廣泛應用，為圖形化介面興起前的主流系統。",
      },
      { emoji: "📠", description: "傳真機：1990 年代辦公室的重要通訊工具，傳送文件靠這台！" },
    ];
    // 複製兩次 打亂順序
    let allCards = [...emojis, ...emojis].sort(() => 0.5 - Math.random());

    return {
      cards: allCards.map((emoji) => ({
        emoji: emoji.emoji,
        description: emoji.description,
        flipped: false,
        matched: false,
      })),
      flippedIndexes: [],
      currentDescription: "",
    };
  },
  methods: {
    flipCard(index) {
      // console.log('這是什麼index',index)
      let card = this.cards[index];
      if (card.flipped || card.matched || this.flippedIndexes.length === 2) return;

      card.flipped = true;
      this.flippedIndexes.push(index);

      if (this.flippedIndexes.length === 2) {
        let [i1, i2] = this.flippedIndexes;
        let card1 = this.cards[i1];
        let card2 = this.cards[i2];

        if (card1.emoji === card2.emoji) {
          card1.matched = true;
          card2.matched = true;
          this.currentDescription = card1.description;
          this.flippedIndexes = []; // 清空什麼？
        } else {
          setTimeout(() => {
            card1.flipped = false;
            card2.flipped = false;
            this.currentDescription = "";
            this.flippedIndexes = [];
          }, 1000);
        }
      }
    },
    closeModal() {
      this.currentDescription = "";
    }
  },
};
</script>

<style scoped>
body,
html {
  overflow: visible;
}
.card-container {
  position: relative;
  /* width: 100%; */
  height: 100vh;
  background: url("@/assets/era1990.jpg") no-repeat center center/cover;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  /* max-width: 90%; */
  margin: 0 auto;
  align-items: center;
  /* flex-direction: column; */
  /* overflow: hidden; */
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

.card-game {
  text-align: center;
  padding: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); /* 由這邊控制牌的派列 */
  grid-gap: 12px;
  justify-content: center;
  max-width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}

.card {
  /* width: 100px;
  height: 100px; */
  background: #222; 
  border: 2px solid #ccc; 
  border-radius: 10px; 
  cursor: pointer; 
  color: #fff; 
  font-size: 36px; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  aspect-ratio: 1 / 1; /* 保持正方形 */
  max-width: 100px;
  width: 100%;
  /* position: relative; */
  z-index: 2;
}

.top-right {
  position: absolute;
  top: 20px;
  right: 20px;
}

h1,
h3,
p {
  color: white;
}

.next-button {
  background-color: #4caf50;
  color: white;
  padding: 6px 12px;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
  position: relative;
  z-index: 2;
}
.next-button:hover {
  background-color: #45a049;
}
.matched-info {
  margin-top: 30px;
  text-align: left;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  background: grey;
  padding: 20px;
  border-radius: 8px;
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    gap: 8px;
  }
  .card {
    /* width: 80px;
    height: 80px; */
    font-size: 24px;
    max-width: 80px;
  }
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: grey;
  color: #333;
  padding: 30px;
  border-radius: 10px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.close-button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #0cf;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.close-button:hover {
  background: #09a;
}

</style>
