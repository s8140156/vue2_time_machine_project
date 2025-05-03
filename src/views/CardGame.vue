<template>
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
    <div class="matched-info" v-if="currentDescription">
      <h3>已配對卡片介紹：</h3>
      <p>{{ currentDescription }}</p>
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
      currentDescription:'',
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
            this.currentDescription = '';
            this.flippedIndexes = [];
          }, 1000);
        }
      }
    },
  },
};
</script>

<style scoped>
.card-game {
  text-align: center;
  padding: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.card {
  width: 100px;
  height: 100px;
  background: #222;
  border: 2px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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
.matched-info {
  margin-top: 30px;
  text-align: left;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  background: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
}
</style>
