<template>
  <div class="quiz-game">
    <div class="overlay"></div>
    <div class="top-right">
      <router-link to="/choice" class="next-button">下一頁 ➜</router-link>
    </div>

    <h1 class="title">資訊時光機：問答遊戲</h1>

    <div v-if="currentQuestion">
      <h2>{{ currentQuestion.question }}</h2>
      <div class="options">
        <button
          v-for="option in currentQuestion.options"
          :key="option"
          @click="checkAnswer(option)"
        >
          {{ option }}
        </button>
      </div>

      <div v-if="answered">
        <p :class="{ correct: isCorrect, wrong: !isCorrect }">
          {{ isCorrect ? "答對了！🎉" : "答錯了！😢" }}
        </p>
      </div>
    </div>

    <!-- Modal 說明 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>📚 小知識</h3>
        <p>{{ currentQuestion.explanation }}</p>
        <button @click="closeModal" class="close-button">關閉</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuizGame",
  data() {
    return {
      questions: [
        {
          question: "哪一年第一支 iPhone 發表？",
          options: ["2005", "2007", "2009", "2011"],
          answer: "2007",
          explanation: "iPhone 在 2007 年首次發表，正式開啟了智慧型手機的新時代。",
        },
        {
          question: "WWW（全球資訊網）是誰發明的？",
          options: ["Steve Jobs", "Tim Berners-Lee", "Bill Gates", "Elon Musk"],
          answer: "Tim Berners-Lee",
          explanation: "全球資訊網 (WWW) 是 Tim Berners-Lee 在 1989 年發明的，改變了人類獲取資訊的方式。",
        },
        {
          question: "Windows 95 是哪一年推出的？",
          options: ["1993", "1995", "1997", "1999"],
          answer: "1995",
          explanation: "Windows 95 在 1995 年推出，帶來全新圖形化介面及開始功能表，深受歡迎。",
        },
      ],
      currentQuestion: {},
      answered: false,
      isCorrect: false,
      showModal: false,
    };
  },
  created() {
    this.pickRandomQuestion();
  },
  methods: {
    pickRandomQuestion() {
      const randomIndex = Math.floor(Math.random() * this.questions.length);
      this.currentQuestion = this.questions[randomIndex];
      this.answered = false;
      this.isCorrect = false;
      this.showModal = false;
    },
    checkAnswer(option) {
      this.answered = true;
      this.isCorrect = option === this.currentQuestion.answer;
      if (this.isCorrect) {
        this.showModal = true;
      }
    },
    closeModal() {
      this.showModal = false;
      this.pickRandomQuestion();
    },
  },
};
</script>

<style scoped>
.options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  justify-items: center;
  max-width: 600px;
  margin: 0 auto;
}

button {
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  background-color: #0cf;
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s;
  z-index: 2;
}
button:hover {
  transform: scale(1.05);
}

.correct {
  color: green;
  margin-top: 20px;
}

.wrong {
  color: red;
  margin-top: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: grey;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  max-width: 80%;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
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
  position: relative;
  z-index: 2;
}
.next-button:hover {
  background-color: #45a049;
}

.quiz-game {
  position: relative;
  text-align: center;
  padding: 20px;
  min-height: 100vh;
  background: url("@/assets/time-tunnel.jpeg") no-repeat center center/cover;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直置中 */
  align-items: center;    /* 水平置中 */
  color: #fff; /* 確保文字是白的 */
  z-index: 2;


}

h1,
h2,
h3,
p {
  color: white;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* 黑色半透明遮罩 */
  z-index: 1;
}

@media (max-width: 600px) {
  .options {
    grid-template-columns: repeat(2, 1fr);
  }
  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 18px;
  }
  button {
    padding: 8px 16px;
    font-size: 14px;
  }
}
</style>
