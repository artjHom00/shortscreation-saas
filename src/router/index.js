import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import CreateAccountView from '../views/CreateAccountView.vue'
import CreateContentView from '../views/CreateContentView.vue'
import DashboardView from '../views/DashboardView.vue'
import ConfirmAccountView from '../views/ConfirmAccountView.vue'
import AccountsView from '../views/AccountsView.vue'
import AffiliateView from '../views/AffiliateView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ChangePasswordView from '../views/ChangePasswordView.vue'




const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props: true,
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: AuthView,
    props: true,
  },
  {
    path: '/create-account',
    name: 'create-account',
    component: CreateAccountView,
    props: true,
  },
  {
    path: '/confirm-account',
    name: 'confirm-account',
    component: ConfirmAccountView,
    props: true,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    props: true,
  },
  {
    path: '/create-content',
    name: 'create-content',
    component: CreateContentView,
    props: true,
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: AccountsView,
    props: true,
  },
  {
    path: '/affiliate',
    name: 'affiliate',
    component: AffiliateView,
    props: true,
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView,
    props: true,
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: ChangePasswordView,
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
