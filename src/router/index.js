import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import CreateAccountView from '../views/CreateAccountView.vue'
import CreateContentView from '../views/CreateContentView.vue'
import DashboardView from '../views/DashboardView.vue'
import AccountsView from '../views/AccountsView.vue'
import AffiliateView from '../views/AffiliateView.vue'

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
  },
  {
    path: '/create-content',
    name: 'create-content',
    component: CreateContentView
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: AccountsView
  },
  {
    path: '/affiliate',
    name: 'affiliate',
    component: AffiliateView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
