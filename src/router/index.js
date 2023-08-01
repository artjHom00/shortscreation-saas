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
import SubscriptionsView from '../views/SubscriptionsView.vue'




const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    props: true,
  },
  {
    path: '/sign-in',
    name: 'Sign In',
    component: AuthView,
    props: true,
  },
  {
    path: '/create-account',
    name: 'Create Account',
    component: CreateAccountView,
    props: true,
  },
  {
    path: '/confirm-account',
    name: 'Confirm Account',
    component: ConfirmAccountView,
    props: true,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    props: true,
  },
  {
    path: '/subscriptions',
    name: 'Buy a Subscription',
    component: SubscriptionsView,
    props: true,
  },
  {
    path: '/create-content',
    name: 'Set Up Content',
    component: CreateContentView,
    props: true,
  },
  {
    path: '/accounts',
    name: 'Manage Accounts',
    component: AccountsView,
    props: true,
  },
  {
    path: '/affiliate',
    name: 'Affiliates',
    component: AffiliateView,
    props: true,
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: ForgotPasswordView,
    props: true,
  },
  {
    path: '/change-password',
    name: 'Set New Password',
    component: ChangePasswordView,
    props: true,
  }
]


const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  routes
})


router.afterEach((to) => {
  const DEFAULT_TITLE = 'ShortsCreation'

  document.title = to.name ? `${to.name} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
});

export default router
