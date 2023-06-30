import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import CreateAccountView from '../views/CreateAccountView.vue'
import CreateContentView from '../views/CreateAccountView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: AuthView
  },
  {
    path: '/create-account',
    name: 'create-account',
    component: CreateAccountView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/create-content',
    name: 'create-content',
    component: CreateContentView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
