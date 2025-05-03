<template>
  <div class="quiz-game">
    <div class="top-right">
      <router-link to="/" class="next-button">回首頁</router-link>
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
          {{ isCorrect ? "答對了！🎉" : "答錯了！😢 正確答案是：" + currentQuestion.answer }}
        </p>
        <p v-if="showExplanation" class="explanation">
          {{ currentQuestion.explanation }}
        </p>
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
          explanation: 'BB Call 是 1990 年代流行的呼叫器，當時還沒有智慧型手機。'
        },
        {
          question: "WWW（全球資訊網）是誰發明的？",
          options: ["Steve Jobs", "Tim Berners-Lee", "Bill Gates", "Elon Musk"],
          answer: "Tim Berners-Lee",
          explanation: 'xxxxxx。'
        },
        {
          question: "Windows 95 是哪一年推出的？",
          options: ["1993", "1995", "1997", "1999"],
          answer: "1995",
          explanation: 'xxxxxxx。'
        }
      ],
      currentQuestion: null,
      answered: false,
      isCorrect: false,
      showExplanation: false,
    }
  },
  created() {
    this.pickRandomQuestion();
  },
  methods: {
    pickRandomQuestion() {
      const randomIndex = Math.floor(Math.random() * this.questions.length);
      this.currentQuestion = this.questions[randomIndex];
    },
    checkAnswer(selected) {
      this.answered = true;
      this.isCorrect = (selected === this.currentQuestion.answer);
      this.showExplanation = true;
    }
  }
}
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
