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
  </div>
</template>


<script>
export default {
  name: "CardGame",
  data() {
    const emojis = ['📟', '💾', '📱']
    const allCards = [...emojis, ...emojis].sort(() => 0.5 - Math.random())

    return {
      cards: allCards.map(emoji => ({
        emoji,
        flipped: false,
        matched: false
      })),
      flippedIndexes: []
    }
  },
  methods: {
    flipCard(index) {
      const card = this.cards[index]
      if (card.flipped || card.matched || this.flippedIndexes.length === 2) return

      card.flipped = true
      this.flippedIndexes.push(index)

      if (this.flippedIndexes.length === 2) {
        const [i1, i2] = this.flippedIndexes
        const card1 = this.cards[i1]
        const card2 = this.cards[i2]

        if (card1.emoji === card2.emoji) {
          card1.matched = true
          card2.matched = true
          this.flippedIndexes = []
        } else {
          setTimeout(() => {
            card1.flipped = false
            card2.flipped = false
            this.flippedIndexes = []
          }, 1000)
        }
      }
    }
  }
}
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

</style>
