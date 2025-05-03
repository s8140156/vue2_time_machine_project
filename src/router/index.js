import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CardGame from '../views/CardGame.vue'
import QuizGame from '../views/QuizGame.vue'
import ChoiceGame from '../views/ChoiceGame.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
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
  }
]

const router = new VueRouter({
  routes
})

export default router
