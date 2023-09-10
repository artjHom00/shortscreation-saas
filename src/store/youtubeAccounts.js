let axios = require('axios')

module.exports = {
    actions: {
        async getYoutubeAccounts(ctx) {
            axios.get(ctx.rootState.host + `/youtube-accounts/`, {
                headers: {
                    'Authorization': ctx.rootGetters['user/getJWT']
                }
            })
            .then(({ data }) => {
                ctx.commit('updateYoutubeAccounts', data)
            }).catch(({ response: { data }}) => {
                console.log("🚀 ~ file: DashboardView.vue:87 ~ .then ~ data:", data)
                // happens when token is 'Bearer null', which means user is not authorized
                // if(data.name === 'JsonWebTokenError') {
                //     window.location.href = '/create-account'
                // }
                // this.$router.push('/')
            })
        }
    },
    mutations: {
        updateYoutubeAccounts(state, youtubeAccounts) {
            state.youtubeAccounts = youtubeAccounts
        }
    },
    state: {
        youtubeAccounts: []
    },
    getters: {
        getYoutubeAccountsPreview(state) {
            
            let filteredYoutubeAccounts = state.youtubeAccounts.map((account) => {
                return {
                    id: account._id,
                    event_trigger_url: account.event_trigger_url,
                    credentials_valid: account.credentials_valid,
                    last_upload: account.last_upload,
                    last_log: account.last_log
                }
            })

            return filteredYoutubeAccounts
        },
        getFullYoutubeAccountsInfo(state) {
            
            return state.youtubeAccounts

        }
    },
}