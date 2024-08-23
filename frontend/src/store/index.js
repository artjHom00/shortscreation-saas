import { createStore } from 'vuex'

export default createStore({
  state: {
    // host: 'http://localhost/',
    host: 'https://shortscreation.tech',
  },
  modules: {
    user: {
      namespaced: true,
      ...require('./user.js')
    },
    youtubeAccounts: require('./youtubeAccounts.js')
  }
})
