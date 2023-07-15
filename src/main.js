import { createApp, Vue } from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import store from './store'


createApp(App).use(store).use(VueCookies).use(router).mount('#app')
