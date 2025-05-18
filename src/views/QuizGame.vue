<template>
  <div class="quiz-game">
    <div class="top-right">
      <router-link to="/choice" class="next-button">下一頁 ➜</router-link>
    </div>

    <h1>資訊時光機：問答遊戲</h1>

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
          {{
            isCorrect ? "答對了！🎉" : "答錯了！😢"
          }}
        </p>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>📚 小知識</h3>
        <p>{{ currentQuestion.explanation }}</p>
        <button @click="closeModal">關閉</button>
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
          explanation:
            "全球資訊網 (WWW) 是 Tim Berners-Lee 在 1989 年發明的，改變了人類獲取資訊的方式。",
        },
        {
          question: "Windows 95 是哪一年推出的？",
          options: ["1993", "1995", "1997", "1999"],
          answer: "1995",
          explanation:
            "Windows 95 在 1995 年推出，帶來全新圖形化介面及開始功能表，深受歡迎。",
        },
      ],
      currentQuestion: null,
      answered: false,
      isCorrect: false,
      showExplanation: false,
      showModal: false,
      currentQuestion: {},
    };
  },
  created() {
    this.pickRandomQuestion();
  },
  methods: {
    pickRandomQuestion() {
      const randomIndex = Math.floor(Math.random() * this.questions.length);
      this.currentQuestion = this.questions[randomIndex];
    },
    checkAnswer(option) {
      this.answered = true;
      this.isCorrect = option === this.currentQuestion.answer;

      if (this.isCorrect) {
        this.showModal = true;  // 答對才開啟說明
      }
    },
    closeModal() {
      this.showModal = false;
    }
  },
};
</script>

<style scoped>
.quiz-game {
  text-align: center;
  padding: 20px;
}

.options {
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* 換行支援 */
  gap: 1rem; /* 間距 */
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.correct {
  color: green;
  margin-top: 20px;
}

.wrong {
  color: red;
  margin-top: 20px;
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
  background: #fff;
  padding: 20px 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

</style>
