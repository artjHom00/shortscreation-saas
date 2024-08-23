import { createApp } from 'vue'
import VueCookies from 'vue-cookies'
// import Popper from 'vue3-popper'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(VueCookies).use(router).mount('#app')

// app.component('Notification', Popper);