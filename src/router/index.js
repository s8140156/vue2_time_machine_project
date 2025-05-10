import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CardGame from '../views/CardGame.vue'
import QuizGame from '../views/QuizGame.vue'
import ChoiceGame from '../views/ChoiceGame.vue'
import PastEnding from '../views/PastEnding.vue'
import FutureEnding from '../views/FutureEnding.vue'
import TechIntro from '../views/TechIntro.vue'
import TechDetail from '../views/TechDetail.vue';
import TechConclusion from '../views/TechConclusion.vue';
import FinalEnding from '../views/FinalEnding.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/card',
    name: 'CardGame',
    component: CardGame
  },
  {
    path: '/quiz',
    name: 'QuizGame',
    component: QuizGame
  },
  {
    path: '/choice',
    name: 'ChoiceGame',
    component: ChoiceGame
  },
  {
    path: '/past-ending',
    name: 'PastEnding',
    component: PastEnding
  },
  {
    path: '/future-ending',
    name: 'FutureEnding',
    component: FutureEnding
  },
  {
    path: '/tech-intro',
    name: 'TechIntro',
    component: TechIntro
  },
  {
    path: '/tech-detail',
    name: 'TechDetail',
    component: TechDetail
  },
  {
    path: '/tech-conclusion',
    name: 'TechConclusion',
    component: TechConclusion
  },
  {
    path: '/final-ending',
    name: 'FinalEnding',
    component: FinalEnding
  },
]

const router = new VueRouter({
  routes
})

export default router
